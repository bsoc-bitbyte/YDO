from collections import defaultdict

from flask import Blueprint, request, jsonify, g
from supabase_client import supabase
from functools import wraps

users_bp = Blueprint("users",__name__)

def auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return jsonify({"error": "Authorization header is missing or invalid"}), 401
            access_token = auth_header.split(" ")[1]
            user_response = supabase.auth.get_user(access_token)
            if not user_response.data:
                return jsonify({"error": "User not authenticated"}), 401
            g.user = user_response.data
            g.user_id = user_response.data["id"]
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": str(e)}), 401
    return decorated_function

@users_bp.route("/all", methods=["GET"])
@auth_required
def get_users():
    try:
        users_response = supabase.table("user_info").select("*").execute()
        if not users_response.data:
            return jsonify({"message":"No users found"}), 404
        users=users_response.data
        user_ids = [user["id"] for user in users]
        tags_response = supabase.table("tags_user_table")\
            .select("user_id, tag_id, tags_table(name)")\
            .in_("user_id",user_ids)\
            .execute()
        user_tags_map = defaultdict(list)
        for entry in tags_response.data:
            user_id = entry["user_id"]
            tag_name = entry["tags_table"]["name"]
            user_tags_map[user_id].append(tag_name)
        for user in users:
            user["tags"] = user_tags_map.get(user["id"], [])

        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error getting profiles from database": str(e)}), 500


@users_bp.route("/me",methods=["GET"])
@auth_required
def get_user():
   try:
       user_response = supabase.table("user_info").select("*").eq("id", g.user_id).single().execute()
       if not user_response.data:
           return jsonify({"message":f"User with id {g.user_id} not found"}), 404
       user = user_response.data
       tags_response = supabase.table("tags_user_table") \
           .select("tag_id, tags_table(name)") \
           .eq("user_id", g.user_id) \
           .execute()
       tags=[entry["tags_table"]["name"] for entry in tags_response.data]
       user["tags"]=tags
       return jsonify(user), 200
   except Exception as e:
       return jsonify({"error fetching user profile": str(e)}), 500

@users_bp.route("/me",methods=["DELETE"])
@auth_required
def delete_user():
    try:
        supabase.table("tags_user_table").delete().eq("user_id",g.user_id).execute()
        supabase.table("user_info").delete().eq("id",g.user_id).execute()
        return jsonify({"message":"User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error deleting user":str(e)}), 500

#add a single user
@users_bp.route("/register",methods=["POST"])
@auth_required
def add_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message":"No data provided"}), 400
        data["id"] = g.user_id
        tags = data.pop("tags",[])
        existing = supabase.table("user_info").select("id").eq("id", g.user_id).maybe_single().execute()
        if existing.data:
            return jsonify({"message": "User already registered"}), 409
        response = supabase.table("user_info").insert(data).execute()
        if not response.data:
            return jsonify({"message":"Error adding user"}), 500
        user_id = response.data[0]["id"]
        for tag in tags:
            tag_insert = {"user_id":user_id, "tag_id":tag}
            supabase.table("tags_user_table").insert(tag_insert).execute()
        return jsonify({"message":"User added successfully"}), 201
    except Exception as e:
        return jsonify({"error adding user":str(e)}), 500


#modify a user
@users_bp.route("/me", methods=["PUT"])
@auth_required
def modify_user():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message":"No data provided"}), 400
        tags = data.pop("tags",[])
        supabase.table("user_info").update(data).eq("id",g.user_id).execute()
        if tags is not None:
            supabase.table("tags_user_table").delete().eq("user_id", g.user_id).execute()
            for tag in tags:
                tag_insert = {"user_id": g.user_id, "tag_id": tag}
                supabase.table("tags_user_table").insert(tag_insert).execute()
        return jsonify({"message":"User updated successfully"}), 200
    except Exception as e:
        return jsonify({"error updating user":str(e)}), 500

    #get only id of a user
@users_bp.route("/roll-number", methods=["GET"])
@auth_required
def roll_number_user():
    try:
        return jsonify({"Roll Number of user": g.user_id}), 200
    except Exception as e:
        return jsonify({"error getting roll number": str(e)}), 500



