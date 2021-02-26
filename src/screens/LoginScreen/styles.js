import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#E9B09A',
        marginTop: 10,
        fontSize:20,
        color:'black',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
    },
    button: {
        backgroundColor: '#7DD1D8',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color:'black',
        fontSize: 16,
        fontWeight: "bold",
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#7DD1D8",
        fontWeight: "bold",
        fontSize: 16,
    }
})