import PDFDocument from 'pdfkit';

export class PdfManager {
    
    static async createPdfOrder(ticket) {

        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const buffers = [];
            
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffers);
                resolve(pdfBuffer);
            });
            
            // Encabezado
            doc.fontSize(20).text(`Orden de compra de ${ticket.owner.name} ${ticket.owner.second_name && `${ticket.owner.second_name}`} ${ticket.owner.last_name}`, {
                align: 'center',
                underline: true,
                marginBottom: 10
            });
            
            // Detalles de los productos
            doc.fontSize(16).text('Productos:', { marginBottom: 10 });
            ticket.products.forEach(prod => {
                doc.fontSize(12).text(`Título: ${prod.product.title}`, { marginBottom: 5 });
                doc.fontSize(12).text(`Precio unitario: $${prod.product.price}`, { marginBottom: 5 });
                doc.fontSize(12).text(`Cantidad: ${prod.quantity}`, { marginBottom: 10 });
            });
        
            // Información de pago
            doc.fontSize(16).text('Información de pago:', { marginTop: 20, marginBottom: 10 });
            doc.fontSize(12).text(`Email de contacto: ${ticket.owner.email}`, { marginBottom: 5 });
            doc.fontSize(12).text(`Método de pago: ${ticket.payment_method}`, { marginBottom: 5 });
            doc.fontSize(12).text(`Cantidad de productos comprados: ${ticket.quantity}`, { marginBottom: 5 });
            doc.fontSize(12).text(`Monto total: $${ticket.amount}`, { marginBottom: 5 });
            doc.fontSize(12).text(`Estado de la compra: ${ticket.status}`, { marginBottom: 5 });
            doc.fontSize(12).text(`Id de compra: ${ticket._id}`, { marginBottom: 5 });
            
            // Finalizar el documento
            doc.end();
        }); // <-- Este es el corchete de cierre de la función new Promise
    }
}
