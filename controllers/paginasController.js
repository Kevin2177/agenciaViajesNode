import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) =>{ // req - lo que enviamos   :  res - lo que express nos responde
    
    // Forma de ejecutar 2 consultas a la vez, para ser más eficiente la ejecución
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );

    try {
        const resultado = await Promise.all( promiseDB ); // 

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
    
    
}

const paginaNosotros = (req, res) =>{ 
    // res.send('Nosotros'); // Muestra un mensaje simple
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) =>{ 
    // Consultar db
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes
    }); // Muestra una vista
}

const paginaTestimoniales = async (req, res) =>{ 
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }); // Muestra una vista

    } catch (error) {
        console.log(error);
    }


}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        
        res.render('viaje',{
            pagina: 'Información viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
  
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}