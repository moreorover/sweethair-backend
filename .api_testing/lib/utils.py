def build_content_headers(access_token, content_type="application/json"):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": content_type
    }
    return headers
