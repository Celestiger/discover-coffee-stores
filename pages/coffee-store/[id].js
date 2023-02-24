import { useRouter } from 'next/router';
import coffeeStoresData from '@/data/coffee-stores.json';

export const getStaticProps = async (staticProps) => {
  const params = staticProps.params;

  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id === 0
      ),
    },
  };
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async (ctx) => {
  return {
    paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
    fallback: "blocking"
  };
};

const CoffeeStore = () => {
  const router = useRouter();
  console.log('router', router);

  return <div>Coffee store Page {router.query.id}</div>;
};

export default CoffeeStore;
