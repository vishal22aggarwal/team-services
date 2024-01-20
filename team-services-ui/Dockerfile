ARG CI_REGISTRY

FROM $CI_REGISTRY/dep/library/project-oci-images/runtime-angular-nginx:1.23-update1

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

USER 1001
EXPOSE 4200
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD curl -f -s localhost:4200 || exit 1
