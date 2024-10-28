class Carrito {
    constructor() {
        this.productos = [];
    }

    meterProducto(producto, cantidad) {
        const index = this.productos.findIndex(p => p.SKU === producto.SKU);
        if (index > -1) {
            this.productos[index].cantidad = cantidad++;
        } else {
            this.productos.push({ ...producto, cantidad });
        }
    }

    quitarProducto(producto, cantidad) {
        const index = this.productos.findIndex(p => p.SKU === producto.SKU);
        if (index > -1) {
            this.productos[index].cantidad -= cantidad;
            if (this.productos[index].cantidad <= 0) {
                this.productos.splice(index, 1); 
            }
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
    }

    mostrarCesta() {
        const tablaCesta = document.getElementById("tablaCesta");
        tablaCesta.innerHTML = ''; 
        this.productos.forEach(producto => {
            const tr = document.createElement('tr');
            const tdTitulo = document.createElement('td');
            tdTitulo.innerText = producto.title;

            const tdCantidad = document.createElement('td');
            tdCantidad.innerText = " x " + producto.cantidad;

            const tdPrecio = document.createElement('td');
            tdPrecio.innerText = (producto.price * producto.cantidad).toFixed(2) + " " + moneda;

            tr.append(tdTitulo, tdCantidad, tdPrecio);
            tablaCesta.append(tr);
        });

        const total = this.calcularTotal();

        const trTotal = document.createElement('tr');
        const tdTotalLabel = document.createElement('td');
        tdTotalLabel.innerHTML = `<strong>Total a pagar:</strong>`;
        const tdTotalPrecio = document.createElement('td');
        tdTotalPrecio.innerText = total.toFixed(2) + " " + moneda;
        trTotal.append(tdTotalLabel, tdTotalPrecio);
        tablaCesta.append(trTotal);
    }

}


document.addEventListener('DOMContentLoaded', function (event) {
    let carrito = new Carrito();

    function cargarTabla(productos){
        const tablaProductos = document.getElementById("tablaProductos");


        productos.forEach(product => {
            const sku = document.createElement('td');
            sku.innerText = product.SKU + "\n"  + product.title;

            const cantidad = document.createElement('div');
            const but1 = document.createElement('button');
            but1.style.backgroundColor = 'rgb(245, 246, 211)';
            but1.textContent = "-";
            var cuadro = document.createElement('input');
            cuadro.style.width = '25px';
            cuadro.style.textAlign = 'center';
            cuadro.value = 0;
            const but2 = document.createElement('button');
            but2.style.backgroundColor = 'rgb(245, 246, 211)';
            but2.textContent = "+";
            cantidad.append(but1, cuadro, but2);

            let cant = 0;
            but1.addEventListener('click', function (event){
                if (cuadro.value > 0){    
                    cuadro.value--;
                    cant = cuadro.value;
                    precioFinal(product, cant, precioTotal);
                }
            });

            but2.addEventListener('click', function (event){
                if (cuadro.value >= 0){ 
                    cuadro.value++;
                    cant = cuadro.value;
                    precioFinal(product, cant, precioTotal);
                }
            });

            const precio = document.createElement('td');
            precio.innerText = product.price + " " + moneda;

            const precioTotal = document.createElement('td');
            precioTotal.textContent = "0 €";

            const tr = document.createElement('tr');
            tr.append(sku, cantidad, precio, precioTotal);

            tablaProductos.append(tr);
        });

    }

    function precioFinal(product, cant, precioTotal) {
        precioTotal.innerText = (product.price * cant).toFixed([2]) + " " + moneda;

        if (cant > 0) {
            carrito.meterProducto(product, parseInt(cant));
        }
        else{
            carrito.quitarProducto(product, 1);
        }

        carrito.mostrarCesta();

    }


    fetch('https://jsonblob.com/api/1297615530822066176')
        .then(response => response.json())
            .then(datos => {
                moneda = datos.currency;
                productos = datos.products;
                cargarTabla(productos);
    });

});
