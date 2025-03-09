const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message: message,
      data: data,
    });
  };
  
  const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, errors = []) => {
    return res.status(statusCode).json({
      success: false,
      message: message,
      errors: errors, // Optionally include specific error details
    });
  };
  
  export { successResponse, errorResponse };