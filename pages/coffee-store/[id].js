import { useRouter } from 'next/router';
import coffeeStoresData from '@/data/coffee-stores.json';
import Link from 'next/link';
import Head from 'next/head';

import styles from '@/styles/coffee-store.module.css';
import Image from 'next/image';

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id === parseInt(params.id, 10)
      ),
    },
  };
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
  const paths = coffeeStoresData.map((coffeeStore) => {
    return { params: { id: coffeeStore.id } };
  });

  return {
    paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
    fallback: true,
  };
};

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link legacyBehavior href="/">
              <a>back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImage}
            src={imgUrl}
            width={600}
            height={360}
            alt={name}
          />
        </div>

        <div className={styles.col2}>
          <p>{address}</p>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
