import React, {
	Component
}
from 'react';
import {
	ToastAndroid,
	Button,
	StyleSheet,
	Text,
	TextInput,
	Picker,
	View,
	Switch,
	CheckBox,
	Slider
}
from 'react-native';
export default class AppBanco extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moneda:1,
			email:"",
			cuit:"",
			monto:0,
			dias:10,
			checked:true,
			interes:0,
			tasa:0,
			enviar: true,
			hacerP:false,
			resultado:"",
			
			
			
		};
		this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
		this.intereses = this.intereses.bind(this);
	}
	hacerPlazoFijo() {
		if(this.state.checked) {
            if(this.state.monto==0) {
				this.state.hacerP=false;
            ToastAndroid.show('El monto debe ser mayor a Cero',ToastAndroid.LONG);
			}else{
				if(this.state.cuit=="") {
					this.state.hacerP=false;
				ToastAndroid.show('Debe ingresar un Cuit',ToastAndroid.LONG);
				}else{
					if(this.state.email=="") {
						this.state.hacerP=false;
					ToastAndroid.show('Debe ingresar un Email',ToastAndroid.LONG);
					}else{
					  this.state.hacerP=true;					  
					  ToastAndroid.show('Plazo fijo aceptado!',ToastAndroid.LONG);
					}
				}
			}
		}else{
		 ToastAndroid.show('Debe aceptar las condiciones',ToastAndroid.LONG);
		}
	}
	
	intereses(value) {
		this.setState({ dias: Number.parseInt (value,10) });
		
		if(this.state.monto<=5000) {
            if(this.state.dias<30) {
            this.setState({ tasa: 25 })
			}else{
              this.setState({ tasa: 27.5 })
			}
		}
		
		if(this.state.monto<=99999) {
            if(this.state.dias<30) {
            this.setState({ tasa: 30 })
			}else{
              this.setState({ tasa: 32.3 })
			}
		}
		
		if(this.state.monto>99999) {
            if(this.state.dias<30) {
            this.setState({ tasa: 35 })
			}else{
              this.setState({ tasa: 38.3 })
			}
		}
			
		this.setState({ interes: (this.state.monto * (Math.pow((1 + (this.state.tasa/100)), (this.state.dias/360))-1) ) }) 
		ToastAndroid.show('calcular intereses',	ToastAndroid.LONG);
	}
	
	
	
	
	
	
	
	render() {
		return (
			 <View style = {
				styles.container
			}>
			<Text></Text>
			<Text></Text>
			<Text></Text>
			<Text></Text>
			 <Text> Correo Electronico </Text>
			 <TextInput 
               
					keyboardType="email-address"
				onChangeText = {(text) => this.setState({email:text})}
				/>
			 <Text> CUIT </Text>
			 <TextInput 
                keyboardType="numeric"
				onChangeText = {(text) => this.setState({cuit:text})}
				/>
			 <Text> Moneda </Text>
			 <Picker
				style = { {width: 200}}
				selectedValue = {this.state.moneda}
				onValueChange = {(valor) => this.setState({	moneda: valor})}>
				<Picker.Item label = "Dolar" value = "1" / >
				<Picker.Item label = "Pesos ARS" value = "2" / >
			 </Picker>
			 
				 <Text> Monto </Text>
				 <TextInput 
					  keyboardType="numeric"
					onChangeText = {(text) => this.setState({monto:text})}
					/>
			 
			 <Text></Text>
			 <View style={{ flexDirection: 'row' }}>
				<Text> Dias: </Text>			 
				<Text style={styles.text}>{String(this.state.dias)}</Text>
			 </View>
        <Slider
          step={1}
		  minimumValue={10}
          maximumValue={120}
		  style = { {width: 400}}
          onValueChange = {(value) => this.intereses(value)}
          
        />
		<View style={{ flexDirection: 'row' }}>
				<Text> Intereses: </Text>
					
				<Text style={styles.text}>{String(this.state.interes)}</Text>
			 </View>
      <Text></Text>
			 
			 <View style={{ flexDirection: 'row' }}>
				 <Text> Avisar por mail </Text>
				 
				<Switch
					onValueChange={(value) => this.setState({enviar: value})}
					value={this.state.enviar} />				
			</View>

  
			 <View style={{ flexDirection: 'row' }}>
				<Text style={{marginTop: 5}}>Acepto condiciones</Text>
				<CheckBox
				  value={this.state.checked}
				  onValueChange={() => this.setState({ checked: !this.state.checked })}
				/>    
			  </View>
			  

			 <Button title = "Hacer Plazo Fijo"
				color = "#FF0000"
				onPress = {	this.hacerPlazoFijo	}
				>
			 </Button>
			
			<Text style={styles.text}>{"hola ${this.state.hacerP}"}</Text>	
			 </View> );
	}
}
const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			backgroundColor: '#F5FCFF',
		},
		welcome: {
			fontSize: 20,
			textAlign: 'center',
			margin: 10,
		},
		instructions: {
			textAlign: 'center',
			color: '#333333',
			marginBottom: 5,
		},
	});






