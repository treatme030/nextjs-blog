import ReactDOM from 'react-dom';
import classes from './notification.module.css';

const Notification = ({ notification }) => {
  const { title, message, status } = notification;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  //ReactDOM.createPortal(요소, 문자열 또는 조각과 같이 렌더링하려는 구성 요소, DOM 계층 외부에 있는 DOM 노드로 portal이 삽입될 상위 구성요소);
  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications')
  );
};

export default Notification;
