export const AuthPage = ({type, typeInput}) => {
    return(
    <div>
        <div>
        {/* this is blank but fills up the whole page*/}
        </div>

        {/* this block is opaque */}
        <div>
            <h1>Find Your Pages</h1>
            <h2>{type}</h2>
            {typeInput}
        </div>
    </div>
    );
};

export default AuthPage;