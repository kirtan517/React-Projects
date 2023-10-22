import React from "react";
import {Pagination,PaginationItem} from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getPosts } from "../actions/post";

const CustomPagination = ({page}) =>{


    const dispatch = useDispatch();

    const {numberOfPages} = useSelector((state)=>state.posts)
    

    useEffect(()=>{
        if(page)
        dispatch(getPosts(page));
    },[page])

    const classes = useStyles();
    return (
        <Pagination

        classes = {{ul : classes.ui , }}
        count = {numberOfPages}
        page = {page}
        vairant = "outlined"
        color = "primary"
        renderItem = {(item)=>(
            <PaginationItem {...item} component = {Link} to={`/posts?page=${item.page}`}/>
        )}
        />
    )
}

export default CustomPagination;