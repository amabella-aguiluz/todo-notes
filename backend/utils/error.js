// error handling

export const errorMsg = async () => {
     res.status(500).json({error: err.message});
};

export default errorMsg;