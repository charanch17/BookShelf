import styles from "./Tabs.module.css";
const Tabs = (props) => {
  return (
    <div className={styles.tabs}>
      {props.tabs &&
        props.tabs.map((tab) => {
          return (
            <span className={`${tab.isactive?styles.tab:styles.inactive}`} onClick={()=>{props.onClick(tab.title)}} key={tab.title}>
              <h4 className={styles.title}>{tab.title}</h4>
              {tab.isactive && <span className={styles.outcurve}></span>}
            </span>
          );
        })}
    </div>
  );
};
export default Tabs;
