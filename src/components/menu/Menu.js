import { slide as SideMenu } from "react-burger-menu";
import { connect } from "react-redux";
import "./style.css";

const Menu = ({ children, isOpen }) => {
  return (
    <SideMenu
      isOpen={isOpen}
      customBurgerIcon={false}
      customCrossIcon={false}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
    >
      {children}
    </SideMenu>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.menu.isOpen,
  };
};

export default connect(mapStateToProps)(Menu);
