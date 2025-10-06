import { createSlice } from "@reduxjs/toolkit";


const Carts= createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },
    reducers:{
        Addtocart:(state, actions)=>{
            console.log(actions.payload);
             const Cartdata  = state.cart.filter(key=>key.id==actions.payload.id);
            if(Cartdata.length >=1){
                alert("Product Added Already")
            }
            else{
                state.cart.push(actions.payload);
            }
    },
    Increment:(state,actions)=>{
        for(let i =0;i<state.cart.length;i++){
            if(state.cart[i].id==actions.payload.id){
                state.cart[i].qty++;
            }
        }
    },
    Decrement:(state, actions)=>{
        for(let i =0;i<state.cart.length;i++){
            if(state.cart[i].id==actions.payload.id){
                if(state.cart[i].qty<=1){
                    alert("Can not less one product At Least select one product")
                }
                else{
                    state.cart[i].qty--;
                }
            }
        }
    },
    ProDelete:(state,actions)=>{
        state.cart=state.cart.filter(key=>key.id!=actions.payload.id);
        alert("Product is Deleted successfully")
    }
}
})

export const {Addtocart, Increment, Decrement, ProDelete} =Carts.actions;
export default Carts.reducer;