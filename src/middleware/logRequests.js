export default function logRequests(logger) {
  return (req, res, next) => {
    logger.info(req.body, "Incoming request");

    next();
  };
}
