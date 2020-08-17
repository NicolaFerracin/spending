import { Line } from 'react-chartjs-2';
import { MONTHS } from '../../utils';
import styles from './styles.module.scss';

const chartOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

export default function StatsByYear({ year, data, total, toggle, shouldDisplay }) {
  const getChartData = data => ({
    labels: MONTHS,
    datasets: [
      {
        fill: false,
        lineTension: 0.1,
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderWidth: 2,
        data: getDataByMonth(data)
      }
    ]
  });
  const getMonths = data => Object.keys(data).sort((a, b) => a - b);

  const getDataByMonth = data =>
    getMonths(data).reduce((acc, el) => {
      acc.push(data[el]);
      return acc;
    }, []);

  return (
    <>
      <h3
        className={`${styles.toggle} ${shouldDisplay ? styles.open : styles.closed}`}
        onClick={() => toggle(year)}
      >
        {year}
      </h3>
      {shouldDisplay && (
        <>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span>Total</span>
              <span>{total}€</span>
            </div>
            <div className={styles.stat}>
              <span>Average per month</span>
              <span>{total / getMonths(data).pop()}€</span>
            </div>
          </div>
          <Line data={getChartData(data)} options={chartOptions} />
        </>
      )}
      <hr />
    </>
  );
}
