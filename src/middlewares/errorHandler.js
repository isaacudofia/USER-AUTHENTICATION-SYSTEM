//Centralized Error Handling

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    status: 500,
    message: `Something went wrong!!!`,
  });
};

export default errorHandler;
