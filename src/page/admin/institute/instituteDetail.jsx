import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FcInspection } from 'react-icons/fc';

const InstituteDetail = () => {
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          <FcInspection />
          조직관리
        </div>
      </div>
    </main>
  )
}

export default InstituteDetail;