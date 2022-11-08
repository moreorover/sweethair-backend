from config import LOG


def build_request_headers(access_token, accept_type="application/json", **kwargs):
    LOG.info("build_request_headers")
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": accept_type,
    }
    if "content_type" in kwargs:
        headers["Content-Type"] = kwargs["content_type"]
    if "content_length" in kwargs:
        size = kwargs["content_length"]
        headers["Content-Length"] = f"{size}"

    LOG.info(f"Request headers: {headers}")
    return headers
