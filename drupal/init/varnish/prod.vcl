#
# This is an example VCL file for Varnish.
#
# It does not do anything by default, delegating control to the
# builtin VCL. The builtin VCL is called when there is no explicit
# return statement.
#
# See the VCL chapters in the Users Guide at https://www.varnish-cache.org/docs/
# and https://www.varnish-cache.org/trac/wiki/VCLExamples for more examples.

# Marker to tell the VCL compiler that this VCL has been adapted to the
# new 4.0 format.
vcl 4.0;

# Default backend definition. Set this to point to your content server.
backend default {
    .host = "83.217.77.51";
    .port = "80";
    .first_byte_timeout = 300s;
}

# Access control list for PURGE requests.
# Here you need to put the IP address of your web server
acl purge {
    "127.0.0.1";
    "83.217.77.51";
}

sub vcl_synth {
    if (resp.status == 401) {
        set resp.status = 401;
        set resp.http.WWW-Authenticate = "Basic";

        return(deliver);
    }
}

# Respond to incoming requests.
sub vcl_recv {
    if (! req.http.Authorization ~ "Basic dmxhaW86SW5uMHZhdDFl" && (req.method == "GET" || req.method == "HEAD")) {
        return(synth(401, "Authentication required"));
    }
    unset req.http.Authorization;

    # Add an X-Forwarded-For header with the client IP address.
    if (req.restarts == 0) {
        if (req.http.X-Forwarded-For) {
            set req.http.X-Forwarded-For = req.http.X-Forwarded-For + ", " + client.ip;
        }
        else {
            set req.http.X-Forwarded-For = client.ip;
        }
    }

    # Only allow PURGE requests from IP addresses in the 'purge' ACL.
    if (req.method == "PURGE") {
        if (!client.ip ~ purge) {
            return (synth(405, "Not allowed."));
        }
        return (hash);
    }

    # Only allow BAN requests from IP addresses in the 'purge' ACL.
    if (req.method == "BAN") {
        # Same ACL check as above:
        if (!client.ip ~ purge) {
            return (synth(403, "Not allowed."));
        }

        # Logic for the ban, using the Cache-Tags header.
        if (req.http.Cache-Tags) {
            ban("obj.http.Cache-Tags ~ " + req.http.Cache-Tags);
        }
        else {
            return (synth(403, "Cache-Tags header missing."));
        }

        # Throw a synthetic page so the request won't go to the backend.
        return (synth(200, "Ban added."));
    }

    # Only cache GET and HEAD requests (pass through POST requests).
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }

    # Pass through any administrative or AJAX-related paths.
    if (req.url ~ "^/status\.php$" ||
        req.url ~ "^/update\.php$" ||
        req.url ~ "^/admin$" ||
        req.url ~ "^/admin/.*$" ||
        req.url ~ "^/flag/.*$" ||
        req.url ~ "^.*/ajax/.*$" ||
        req.url ~ "^.*/ahah/.*$") {
           return (pass);
    }

    # Removing cookies for static content so Varnish caches these files.
    if (req.url ~ "(?i)\.(pdf|asc|dat|txt|doc|xls|ppt|tgz|csv|png|gif|jpeg|jpg|ico|swf|css|js)(\?.*)?$") {
        unset req.http.Cookie;
    }

    # Remove all cookies that Drupal doesn't need to know about. We explicitly
    # list the ones that Drupal does need, the SESS and NO_CACHE. If, after
    # running this code we find that either of these two cookies remains, we
    # will pass as the page cannot be cached.
    if (req.http.Cookie) {
        # 1. Append a semi-colon to the front of the cookie string.
        # 2. Remove all spaces that appear after semi-colons.
        # 3. Match the cookies we want to keep, adding the space we removed
        #    previously back. (\1) is first matching group in the regsuball.
        # 4. Remove all other cookies, identifying them by the fact that they have
        #    no space after the preceding semi-colon.
        # 5. Remove all spaces and semi-colons from the beginning and end of the
        #    cookie string.
        set req.http.Cookie = ";" + req.http.Cookie;
        set req.http.Cookie = regsuball(req.http.Cookie, "; +", ";");
        set req.http.Cookie = regsuball(req.http.Cookie, ";(SESS[a-z0-9]+|SSESS[a-z0-9]+|NO_CACHE)=", "; \1=");
        set req.http.Cookie = regsuball(req.http.Cookie, ";[^ ][^;]*", "");
        set req.http.Cookie = regsuball(req.http.Cookie, "^[; ]+|[; ]+$", "");

        if (req.http.Cookie == "") {
            # If there are no remaining cookies, remove the cookie header. If there
            # aren't any cookie headers, Varnish's default behavior will be to cache
            # the page.
            unset req.http.Cookie;
        }
        else {
            # If there is any cookies left (a session or NO_CACHE cookie), do not
            # cache the page. Pass it on to Apache directly.
            return (pass);
        }
    }
}

# Set a header to track a cache HITs and MISSes.
sub vcl_deliver {
    # Remove ban-lurker friendly custom headers when delivering to client.
    unset resp.http.X-Url;
    unset resp.http.X-Host;
    # Comment these for easier Drupal cache tag debugging in development.
    unset resp.http.Cache-Tags;
    unset resp.http.X-Drupal-Cache-Contexts;

    if (obj.hits > 0) {
        set resp.http.Cache-Tags = "HIT";
    }
    else {
        set resp.http.Cache-Tags = "MISS";
    }
}

# Instruct Varnish what to do in the case of certain backend responses (beresp).
sub vcl_backend_response {
    # Set ban-lurker friendly custom headers.
    set beresp.http.X-Url = bereq.url;
    set beresp.http.X-Host = bereq.http.host;

    if (beresp.http.Cache-Control ~ "s-maxage") {
        set beresp.http.Cache-Control = regsub(beresp.http.Cache-Control, "s-maxage=[0-9]+(,\s)?", "");
    }

    # Cache 404s, 301s, at 500s with a short lifetime to protect the backend.
    if (beresp.status == 404 || beresp.status == 301 || beresp.status == 500) {
        set beresp.ttl = 10m;
    }

    # Don't allow static files to set cookies.
    # (?i) denotes case insensitive in PCRE (perl compatible regular expressions).
    # This list of extensions appears twice, once here and again in vcl_recv so
    # make sure you edit both and keep them equal.
    if (bereq.url ~ "(?i)\.(pdf|asc|dat|txt|doc|xls|ppt|tgz|csv|png|gif|jpeg|jpg|ico|swf|css|js)(\?.*)?$") {
        unset beresp.http.set-cookie;
    }

    # Allow items to remain in cache up to 6 hours past their cache expiration.
    set beresp.grace = 6h;
}
