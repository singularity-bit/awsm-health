import React,{useState,useEffect} from 'react'
import onClickOutside from 'react-onclickoutside'
function Dropdown(props) {
    const {tags,selectedTags}=props;
    const [isOpen,setOpen]=useState(false);
    const [selectedItem,setSelectedItem]=useState();

    useEffect(()=>{
        selectedTags(selectedItem);
    },[selectedItem])

    Dropdown.handleClickOutside=()=>setOpen(false);

    const dropdownItems=tags.map((item,index)=>{
        //verificam daca itemul pe care am dat click e activ
        const active=selectedItem==item;
        return(
            <a key={index}  onClick={()=>{               
                setSelectedItem(item);
            }}
            className={!active?"dropdown-item":"dropdown-item is-active"}
            >
                    {item}
                </a>
        )

    })
    return (
        <div className={isOpen?"dropdown is-active":"dropdown"}>
                <div className="dropdown-trigger">
                    <button className="button" onClick={()=>{
                        
                        setOpen(!isOpen)
                    }} aria-haspopup="true" aria-controls="dropdown-menu3">
                    <span>Sort by {selectedItem}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                    <div className="dropdown-content">                
                        {dropdownItems}
                    <hr className="dropdown-divider"/>
                    <a href="#" className="dropdown-item">
                        More
                    </a>
                    </div>
                </div>
        </div>
    )
}

const clickOutsideConfig={
    handleClickOutside:()=>Dropdown.handleClickOutside,
};
export default onClickOutside(Dropdown,clickOutsideConfig)
