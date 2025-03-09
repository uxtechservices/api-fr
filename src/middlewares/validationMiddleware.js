const validateCreateLocker = (req, res, next) => {
    const { locker_number } = req.body;
  
    if (!locker_number) {
      return res.status(400).json({ message: 'locker_number is required' });
    }
  
    if (typeof locker_number !== 'number') {
      return res.status(400).json({ message: 'locker_number must be a number' });
    }
      // You can add more complex validation logic here
  
    next(); // Pass control to the next middleware or route handler
  };
  
  export { validateCreateLocker };