// error handling

// default error message
export const errorMsg = (res, err) => {
     res.status(500).json({error: err.message});
};

export default errorMsg;