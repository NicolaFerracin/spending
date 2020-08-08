import styles from './styles.module.scss';

export default function Table(props) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {props.cols
            .sort((a, b) => a.order - b.order)
            .map(c => (
              <th key={c.id}>{c.header}</th>
            ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {props.data.map(d => (
          <tr key={d.id}>
            {props.cols
              .sort((a, b) => a.order - b.order)
              .map(c => (
                <th key={`${d.id}-${c.id}`}>{d[c.id]}</th>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
