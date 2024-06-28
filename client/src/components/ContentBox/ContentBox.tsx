import styles from "./ContentBox.module.scss";

interface IProps {
  children: React.ReactNode;
}

const ContentBox: React.FC<IProps> = (props) => {
  return (
    <div className={styles.root}>
      {/* <div */}
      {/*   style={{ height: "1000px", width: "400px", background: "black" }} */}
      {/* ></div> */}
      {props.children}
    </div>
  );
};

export default ContentBox;
