import { Header, Navbar } from "rsuite";

const HeaderContainer = () => {
  return (
    <>
      <Header>
        <Navbar
          appearance="inverse"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
            fontSize: "25px",
          }}
        >
          <Navbar.Header>
            <a>ClinicR</a>
          </Navbar.Header>
          {/* <LangSelector /> */}
        </Navbar>
      </Header>
    </>
  );
};
export default HeaderContainer;
