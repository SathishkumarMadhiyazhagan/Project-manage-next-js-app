import { useDispatch, useSelector } from 'react-redux'
// import productList from '../data/productList.json'
import '../styles/home.css'
import cartSlice from '../data/cartSlice'
import { useEffect } from 'react'
import { fetchAllProduct } from '../data/productSlice'

const Home = () => {
  // const {data} = useSelector((state) =>  state.products);
  const {cart, products} = useSelector((state) => state)
  const {actions} =  cartSlice;
  const {addToCart, removeFromCart} = actions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct("http://localhost:8000/products"));
  }, [dispatch])

  return (
    <div className="container product-catalogue">
      <div className="row">
        {products.data?.map((product) => {
          return (
            <div className="wrapper col-md-4" key={product.id}>
              <div className="card">
                <img className="card-img-top center-block" src={product.imageUrl} alt="Card cap" />

                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>

                  {!cart.cartProductIds.includes(product.id) && (<button className="btn btn-primary" onClick={() => dispatch(addToCart(product.id))}>
                      Add to cart
                    </button>)}
                  {cart.cartProductIds.includes(product.id) && (<button className="btn btn-danger" onClick={() => dispatch(removeFromCart(product.id))}>
                      Remove from cart
                    </button>)}

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
