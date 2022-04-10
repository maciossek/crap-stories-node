export default function logRequests(logger) {
  return (req, res, next) => {
    logger.trace({ req }, "Incoming request");

    next();
  };
}
