import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { FetchSignup } from '../Req';

function SignUp(props) {
    const navigate = useNavigate();
    const reLetNum = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
    const [show, setShow] = useState(false);
    const [errortype, setMessage] = useState(false);
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreview] = useState('https://cdn2.iconfinder.com/data/icons/ui-icon-variations/24/icn-user-add-512.png');

    const username = useRef(null);
    const password = useRef(null);
    const passwordVal = useRef(null);
    const nickname = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMessage = (message) => {
        setMessage(message);
        handleShow();

    };

    function handleClickSignUp() {
        if (!file.name) {
            handleMessage("Add a profil picture");
            return (1);
        }
        else if (!(username.current.value && username.current.value && nickname.current.value)) {
            handleMessage("Empty box, try again!");
            return (1);
        }
        else if (password.current.value !== passwordVal.current.value) {
            handleMessage("There is a mismatch between the passwords, try again!");
            return (1);
        }
        else if (!reLetNum.test(password.current.value)) {
            handleMessage("The password must contain letters and numbers!");
            return (1);
        }

        FetchSignup(username.current.value, nickname.current.value, password.current.value, navigate, handleMessage, props.start)
    }

    const ImgUpload = ({
        onChange,
        src
    }) =>
        <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="img-wrap img-upload" >
                <img htmlFor="photo-upload" src={src} />
            </div>
            <input id="photo-upload" accept='image/*' type="file" onChange={onChange} />
        </label>


    const photoUpload = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }


    return (
        <main className="form-signuup">
            <h1 className="h3 mb-3 fw-normal noselect">Create an account.</h1>
            <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />

            <form>
                <div className="form-floating">
                    <input ref={username} type="username" className="form-control" id="floatingInput" placeholder="Username" onKeyPress={(e) => e.key === 'Enter' && handleClickSignUp()}></input>
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input ref={password} type="password" className="form-control" id="floatingPassword" placeholder="Password" onKeyPress={(e) => e.key === 'Enter' && handleClickSignUp()}></input>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input ref={passwordVal} type="password" className="form-control" id="floatingPasswordVal" placeholder="Password Validation" onKeyPress={(e) => e.key === 'Enter' && handleClickSignUp()}></input>
                    <label htmlFor="floatingPassword">Password Validation</label>
                </div>
                <div className="form-floating">
                    <input ref={nickname} type="nickname" className="form-control" id="floatingNickname" placeholder="Nickname" onKeyPress={(e) => e.key === 'Enter' && handleClickSignUp()}></input>
                    <label htmlFor="floatingNickname">Nickname</label>
                </div>
            </form>

            <Button className="w-100 btn btn-lg btn-danger" onClick={handleClickSignUp} type="submit">Sign up</Button>
            <Link className="mt-2 w-100 btn btn-lg btn-secondary" to="/" type="submit">Back</Link>
            <ErrorMessage show={show} handleClose={handleClose} page={"Signup Error"} message={errortype} />
        </main>
    );
}

export default SignUp;