import React from "react";
import InactiveCouponsTable from "./tableInactiveCoupons/inactiveCouponsTable";
import LoadSpinner from "../../assets/loadSpinner"


class UnUsedCoupons  extends React.Component{
    constructor(props){
        super(props);
        this.removeLoader=this.removeLoader.bind(this)
        this.state = {
            loading: true,
            visibility:""
        }
    }
    removeLoader(){
        this.setState({loading:false,
                       visibility:"hidden"})
    }
    render(){
        let {visibility, loading}= this.state;
        return(
            <div>
                <LoadSpinner visibility={visibility} loading={loading}/>
                <InactiveCouponsTable removeLoader={this.removeLoader}/>
            </div>
        )
    };
}


export default UnUsedCoupons;