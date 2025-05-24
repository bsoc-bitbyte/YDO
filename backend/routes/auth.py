from flask import Blueprint, current_app, jsonify, redirect, request
from supabase_client import supabase

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signin/google")
def signin_with_google():
    res = supabase.auth.sign_in_with_oauth(
        {
            "provider": "google",
            "options": {"redirect_to": f"{request.host_url}auth/callback"},
        }
    )

    return redirect(res.url)


@auth_bp.route("/callback")
def callback():
    next_url = request.args.get("next", current_app.config["FRONTEND_URL"])
    return redirect(next_url)


@auth_bp.route("/signout")
def signout():
    res = supabase.auth.sign_out()
    return jsonify({"message": "Signed out successfully"}), 200


@auth_bp.route("/user")
def get_user():
    auth_header = request.headers.get("Authorization")
    access_token = None

    if auth_header and auth_header.startswith("Bearer "):
        access_token = auth_header.split(" ")[1]
    elif request.args.get("token"):
        access_token = request.args.get("token")

    if not access_token:
        return jsonify({"error": "No access token provided"}), 401

    try:
        user = supabase.auth.get_user(access_token)

        if user and user.user:
            return jsonify(user.user.user_metadata), 200
        else:
            return jsonify({"error": "User not authenticated"}), 401

    except Exception as e:
        print(f"Error getting user: {e}")
        return jsonify({"error": "Invalid token"}), 401
