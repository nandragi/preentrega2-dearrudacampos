const Simulador = { 
    meta: 0, 
    totalAhorro: 0, 
    historico: [], // Array para almacenar los depósitos 
    setMeta(nuevaMeta) { 
        this.meta = parseFloat(nuevaMeta); 
        alert(`Meta actualizada: $${this.meta}`);
    }, agregarAhorro(mes, ano, monto) { 
        monto = parseFloat(monto); 
        // Permitir el valor 0 pero registrar un mensaje especial 
        if (isNaN(monto) || monto < 0) { 
            alert("Por favor, ingresa un valor válido mayor o igual a 0."); 
            return; 
        } 
        if (monto === 0) { 
            // Registro especial para 0 
            this.historico.push({ mes, ano, monto, mensaje: "En este mes no agregaste saldo" }); 
            alert(`En ${mes}/${ano}: no agregaste saldo.`); 
            return; 
        } 
        this.totalAhorro += monto; 
        this.historico.push({ mes, ano, monto }); 
        alert(`Depósito de $${monto} en ${mes}/${ano} registrado con éxito. Total acumulado: $${this.totalAhorro}`); 
    }, 
    mostrarHistorico() { 
        if (this.historico.length === 0) { 
            alert("No se encontraron registros."); 
            return; 
        } 
        let resumen = "Histórico de Depósitos:\n"; 
        this.historico.forEach((registro) => { 
            if (registro.monto === 0) { 
                resumen += `${registro.mes}/${registro.ano}: ${registro.mensaje}\n`; 
            } else { 
                resumen += `${registro.mes}/${registro.ano}: $${registro.monto}\n`; 
            } 
    }); 
        alert(resumen); // Mostrar el resumen en un alerta 
        console.log("Histórico completo mostrado en consola:"); 
        console.log(resumen); // Mostrar el histórico completo en consola 
        }, 
        buscarPorMes(mes) { 
            const resultados = this.historico.filter((registro) => registro.mes.toLowerCase() === mes.toLowerCase()); 
            return resultados; 
        }, 
        verificarMeta() { 
            if (this.totalAhorro >= this.meta) { 
                alert(`¡Felicidades! Has alcanzado tu meta de $${this.meta}.`); 
            } else { 
                alert(`Aún necesitas $${this.meta - this.totalAhorro} para alcanzar tu meta.`); 
            } 
        } 
   }; //auxiliares 
    function solicitarEntrada(mensaje, validador) { 
        let entrada; do { 
            entrada = prompt(mensaje); 
            if (entrada === null) { 
                alert("Operación cancelada. Volviendo al menú principal..."); 
                return null; 
            } 
            if (!validador(entrada)) { 
                alert("Entrada inválida. Inténtalo de nuevo."); 
            } 
        } while (!validador(entrada)); 
        return entrada; 
    } // Validadores 
    const esNumeroValido = (entrada) => !isNaN(parseFloat(entrada)) && parseFloat(entrada) >= 0; // Acepta el valor 0 
    const esMesValido = (mes) => { 
        const meses = [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ]; 
        return meses.includes(mes.toLowerCase()); 
    }; 
    const esAnoValido = (ano) => !isNaN(parseInt(ano)) && parseInt(ano) >= 2025; 
    //principal 
    alert("¡Bienvenido al Simulador de Ahorro!"); 
    while (true) { 
        const opcion = prompt( "Elige una opción:\n" + 
            "1. Definir meta\n" + 
            "2. Agregar ahorro\n" + 
            "3. Verificar meta\n" + 
            "4. Mostrar historial\n" + 
            "5. Buscar depósitos por mes\n" + 
            "6. Salir" 
        ); 
        if (opcion === null || opcion === "6") { 
            alert("Gracias por usar el simulador. ¡Hasta pronto!"); 
            break; 
        } 
        switch (opcion) { 
            case "1": { 
                const nuevaMeta = solicitarEntrada("Ingresa tu nueva meta de ahorro:", esNumeroValido); 
                if (nuevaMeta !== null) Simulador.setMeta(nuevaMeta); 
                break; 
            } 
            case "2": { 
                const mes = solicitarEntrada("Ingresa el mes del depósito (ej: 'Enero'):", esMesValido); 
                if (mes === null) 
                    break; 
                const ano = solicitarEntrada("Ingresa el año del depósito (ej: '2025'):", esAnoValido); 
                if (ano === null) break; 
                
                const monto = solicitarEntrada(`Ingresa el monto del depósito para ${mes}/${ano}:`, esNumeroValido); 
                if (monto !== null) Simulador.agregarAhorro(mes, ano, monto); 
                break; 
            } 
            case "3": { 
                Simulador.verificarMeta(); 
                break; 
            } 
            case "4": { 
                Simulador.mostrarHistorico(); 
                break; 
            } 
            case "5": { 
                const mesBusqueda = solicitarEntrada("Ingresa el mes que deseas buscar (ej: 'Enero'):", esMesValido); 
                if (mesBusqueda !== null) { 
                    const resultados = Simulador.buscarPorMes(mesBusqueda); 
                    if (resultados.length > 0) { 
                        console.log(`Depósitos encontrados en ${mesBusqueda}:`); 
                        resultados.forEach((registro) => { 
                            console.log(`${registro.mes}/${registro.ano}: $${registro.monto}`);
                        }); 
                    } else { 
                        alert(`No se encontraron depósitos en el mes de ${mesBusqueda}.`); 
                    } 
                } 
                break; 
            } 
            default: 
            alert("Opción no válida. Inténtalo de nuevo."); 
            break; 
        } 
    }
