import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../../store/reducers/userInfo';
import { authSignInWithEmailAndPassword, getUser } from '../../utils/firebase';
import { ReactComponent as Signinline } from './signInLine.svg';
import './signIn.css';

export default function SignIn() {
  const initialValues = { email: '', password: '' };
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required('이메일은 필수 입력 항목입니다.'),
    password: Yup.string().required('패스워드는 필수 입력 값입니다.').min(8, '패스워드는 최소 8자리를 입력해야 합니다.')
  });

  // Animation
  React.useEffect(() => {
    var current = null;
    
    document.querySelector('#email').addEventListener('focus', function(e) {
      if (current) current.pause();
      // console.log("Email animation");
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
      // console.log("Email animation - end");
    });

    document.querySelector('#password').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });

    document.querySelector('#submit').addEventListener('focus', function(e) {
      if (current) current.pause();
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
  });

  // Authentication
  const validate = (values) => {
    let errors = {};
    return errors;
  }

  const navigate = useNavigate();

  const submitForm = async (values) => {
    // console.log(values);
    authSignInWithEmailAndPassword(values.email, values.password)
      .then(async (userCredential) => {
        const tmpUserInfo = await getUser(userCredential.user.uid);
        dispatch(set(tmpUserInfo));
        navigate('/admin/dashboard');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: '로그인 오류',
          text: error,
          footer: '<a href="">패스워드 찾기</a>'
        })
      });
  }

  return (
    <div className="background">
      <div className="page">
        <div className="container">
          <div className="left">
            <div className="login">Login</div>
            <div className="eula">By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
          </div>
          <div className="right">
            <Signinline className="sign-in-svg" />
            <div className="form">
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={submitForm}
              >
                {(formik) => {
                  const { values, handleSubmit, handleChange } = formik;

                  const keyDown = (event) => {
                    if (event.code === 'Space') {
                      handleSubmit();
                    }
                  }
    
                  return (
                    <form id="signInForm" onSubmit={handleSubmit}>
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" value={values.email} onChange={handleChange}/>
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
                      <div id="submit" tabIndex="0" onKeyDown={keyDown}>
                        <input type="submit" value="Submit" />
                      </div>
                    </form>
                  );
                  }}
              </Formik>
            </div>
          </div>
        </div> 
      </div> 
    </div>
  );
}

// Reference
// - https://velog.io/@leemember/React-Form-Validation-%ED%8F%BC%ED%83%9C%EA%B7%B8-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%A6%9D%EC%9D%84-%EC%89%BD%EA%B2%8C-%EB%8F%84%EC%99%80%EC%A3%BC%EB%8A%94-Formik-%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95
// - https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/