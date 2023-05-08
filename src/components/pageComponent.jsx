const PageComponent = (props) => {
  return (
    <main className="main">
      <div className="page-header">
        <div className="page-header__title">
          {props.icon}
          {props.title}
        </div>
      </div>

      <div className="page-body">
        {props.children}
      </div>
    </main>
  )
}

export default PageComponent