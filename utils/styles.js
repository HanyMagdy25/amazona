import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles({
    navbar:{
        backgroundColor:"#203040",
        '& a': {
            marginLeft:10,
            color:'#fff',
        },
    },
    main:{
        minHeight:'80vh'
    },
    brand:{
        fontWeight:"bold",
        fontSize:"1.5rem"
    },
    grow:{
        flexGrow:1,
    },
    footer:{
        textAlign:'center',
        marginTop:10,
    },
    section:{
        marginTop:10,
        marginBottom:10,
    },
    
})

export default useStyles