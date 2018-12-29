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
			capitalInicial:0,
			capitalFinal:0,
			email:"",
			cuit:"",
			monto:"",
			dias:10,
			checked:true,
			interes:0,
			tasa:0,
			
			
		};
		this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
		this.intereses = this.intereses.bind(this);
	}
	hacerPlazoFijo() {
		ToastAndroid.show('Presiono el boton de hacer plazo fijo!',
			ToastAndroid.LONG);
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
			}
			>
			 <Text> Correo Electronico </Text>
			 <TextInput 
                placeholder='correo@mail.com' 
				onChangeText = {(text) => this.setState({email:text})}
				/>
			 <Text> CUIT </Text>
			 <TextInput 
                placeholder='00-00000000-0' 
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
					placeholder='000' 
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
				 <Switch></Switch>
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
			 <Text> [[RESULTADO DE LA OPERACION]] </Text>
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
