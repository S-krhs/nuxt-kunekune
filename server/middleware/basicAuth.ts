export default defineEventHandler((event) => {

  const config = useRuntimeConfig()

  if (String(config.basicAuthRequire) !== 'true') return

  const base64Credentials = event.node.req.headers?.authorization?.split(" ")?.[1]

  if (base64Credentials) {
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
    const [username, password] = credentials.split(":")

    if (
      username === config.basicAuthUser &&
      password === config.basicAuthPassword
    ) return;
  }

  event.node.res.statusCode = 401;
  event.node.res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"')
  event.node.res.end("Unauthorized")
});
  