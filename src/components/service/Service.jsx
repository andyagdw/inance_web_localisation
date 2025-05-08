export default function Service({imgSrc, heading, children, styles}) {
  return (
    <div className="col-sm-6 col-md-4 mx-auto">
      <div className={styles.box}>
        <div className={styles.imgBox}>
          <img src={imgSrc} alt={heading} className={styles.img} />
        </div>
        <div className={styles.detailBox}>
          <h5 className={styles.h5}>{heading}</h5>
          <p className={styles.para}>
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
