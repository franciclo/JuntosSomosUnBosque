import './styles.css'
import React, {Component} from 'react'
import {byId as especieById} from 'utils/get-especies'
import Form from 'utils/form'

export default class TablaArboles extends Component {
  componentWillMount () {
    window.$tate('especiesLoad')
      .on('E')
      .subscribe(() => { this.forceUpdate() })
  }
  tamagnoByNum (n) {
    let label = ''
    switch (n) {
      case '1':
        label = 'Brote'
        break
      case '2':
        label = 'Chico'
        break
      case '3':
        label = 'Mediano'
        break
      case '4':
        label = 'Maduro'
        break
      case '5':
        label = 'Grande'
        break
    }
    return label
  }
  render () {
    return (
      <div
        id='lista-arboles'>
        {
          this.props.showAdmin &&
          (
            <div className='tabla-header'>
              <h1>Mis árboles</h1>
              <button
                onClick={
                  e => {
                    window.$tate('adminArboles').value = true
                  }
                }>
                Sumar arboles
              </button>
            </div>
          )
        }
        {
          (
            <Form
              action='/save-arboles'
              failAlert='true'
              successAlert='true'
              onSuccess={this.props.arbolesSaved}>
              <div className='tabla-arboles'>
                {
                  this.props.arboles.map((arbol, key) => {
                    return (
                      <div
                        key={key}
                        className='item-arbol'>
                        <span
                          title='Eliminar'
                          className='borrar'
                          onClick={
                            this.props.eliminarArbol(arbol.especie, arbol.tamagno)
                          }>
                          &otimes;
                        </span>
                        <span className='especie'>
                          {especieById(arbol.especie)}
                        </span>
                        <span className='tamagno'>
                          ({this.tamagnoByNum(arbol.tamagno)})
                        </span>
                        <input
                          type='hidden'
                          name='arboles[]'
                          defaultValue={
                            JSON.stringify({
                              especie: arbol.especie,
                              tamagno: arbol.tamagno,
                              cantidad: this.props.cantidades[key]
                            })
                          } />
                        <input
                          type='number'
                          data-key={key}
                          max='10000'
                          min='1'
                          onChange={this.props.changeCantidad}
                          value={this.props.cantidades[key]} />
                      </div>
                    )
                  })
                }
                {
                  this.props.arboles.length === 0 &&
                  (
                    <div className='tabla-placeholder'>
                      <span className='sin-arboles-label'>
                        No tenés árboles registrados
                      </span>
                      <input
                        type='hidden'
                        name='arboles[]' />
                    </div>
                  )
                }
              </div>
              <div className='tabla-footer'>
                <div className='total'>
                  {console.log(this.props.cantidades)}
                  Total: {
                    this.props.cantidades
                      .reduce((acc, cant) => {
                        return acc + +cant
                      }, 0)
                  }
                </div>
                <button
                  type='submit'
                  className={!this.props.showSubmit ? 'hide' : ''}>
                  Guardar cambios
                </button>
              </div>
            </Form>
          )
        }
      </div>
    )
  }
}
