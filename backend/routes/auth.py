from flask import (Blueprint, current_app, jsonify, make_response, redirect,
                   request)
from supabase_client import supabase

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/signin/google")
def signin_with_google():
    res = supabase.auth.sign_in_with_oauth(
        {
            "provider": "google",
            "options": {
                "redirect_to": f"{request.host_url}/callback"
            },
        }
    )
    return redirect(res.url)

@auth_bp.route("/callback")
def callback():
    code = request.args.get("code")
    next = request.args.get("next", current_app.config['FRONTEND_URL'])

    if code:
        res = supabase.auth.exchange_code_for_session({"auth_code": code})
        
        response = make_response(redirect(next))
        print(res)

        if res and hasattr(res, 'session'):
            response.set_cookie(
                'access_token', 
                res.session.access_token,
                httponly=False, 
                samesite='None', 
                domain=request.host.split(':')[0],
                max_age=3600
            )
            
        return response

    return redirect(next)

@auth_bp.route("/signout")
def signout():
    res = supabase.auth.sign_out()
    return jsonify({"message": "Signed out successfully"}), 200

@auth_bp.route("/user")
def get_user():
    user = supabase.auth.get_user()
    print("hiii")
    if user and user.user:
        print(type(user),user.user.user_metadata)
        return jsonify(user.user.user_metadata),200
    else:
        return jsonify({"error": "User not authenticated"}), 401

@auth_bp.route("/refresh")
def refresh_token():
    res = supabase.auth.refresh_access_token()
    if res:
        return jsonify(res), 200
    else:
        return jsonify({"error": "Failed to refresh token"}), 401
