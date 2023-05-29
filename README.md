# Meterial UI Dashboard panel

It's a complete dashboard developed using Material Design for general components and layout. 

## 🚀 Get starting

The purpose of this interface is to help customers publish a new product on the platform as an announcement to the public.

That contains following functionalities:
- Login form with validation
- Authentication flux
- Signup form with step and fields validation
- Products list
- Product edition
- Users list 
- User edition
- Payment integration with Mercado Pago 


### 🔧 Installation

```
yarn
```

create .env file with following keys and set the right values:
```
REACT_APP_MP_PUBLIC_KEY=<mercado_pago_public_key>
REACT_APP_API_URL=<api_base_url>
```

```
yarn start
```


## 🛠️ Built with

* [ReactJS]([http://www.dropwizard.io/1.0.2/docs/](https://react.dev/)) - Core
* [MUI]([https://maven.apache.org/](https://mui.com/)) - Components Library
* [Styled Components]([https://rometools.github.io/rome/](https://styled-components.com/)) - Visual Styles
* [Mercado Pago Brick]([https://rometools.github.io/rome/](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/landing)) - Payment Gateway
