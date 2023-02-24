import Image from 'next/image';
import Link from 'next/link';
import cls from 'classnames';

import styles from './card.module.css';

const Card = (props) => {
  return (
    <Link legacyBehavior href={props.href}>
      <a className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>

          <div className={styles.cardHeadderWrapper}>
            <h2 className={styles.cardHeadder}>{props.name}</h2>
          </div>

          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
              alt={props.name}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
