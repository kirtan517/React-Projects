import React from "react";
import {Pagination,PaginationItem} from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const CustomPagination = () =>{
    const classes = useStyles();
    return (
        <Pagination
        classes = {{ul : classes.ui , }}
        count = {5}
        page = {1}
        vairant = "outlined"
        color = "primary"
        renderItem = {(item)=>(
            <PaginationItem {...item} component = {Link} to={`/posts?page=${1}`}/>
        )}
        />
    )
}

export default CustomPagination;