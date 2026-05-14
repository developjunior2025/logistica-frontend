import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, FileText, UploadCloud, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock Data
const orderMock = {
  id: 'ORD-2026-001',
  quotationId: 'COT-2026-003',
  storeName: 'Logística Portuaria Global',
  serviceName: 'Almacenamiento Refrigerado',
  total: 1500.00,
  status: 'PAYMENT_PENDING', // PAYMENT_VERIFYING, IN_PROGRESS
  bankDetails: {
    bank: 'BBVA Bancomer',
    account: '0123456789',
    clabe: '012180001234567890',
    beneficiary: 'Marketplace Portuario S.A. de C.V.',
  }
};

export function OrderDetailPage() {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(orderMock.status);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadPayment = () => {
    if (!file) return;
    setIsUploading(true);
    // Simular subida de archivo y creación del registro de pago
    setTimeout(() => {
      setIsUploading(false);
      setPaymentStatus('PAYMENT_VERIFYING');
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <Link 
          to="/orders"
          className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mis órdenes
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Orden de Trabajo <span className="text-blue-600">{id}</span>
            </h1>
            <p className="text-slate-500 mt-1">Basada en la cotización {orderMock.quotationId}</p>
          </div>
          {paymentStatus === 'PAYMENT_PENDING' && (
            <Badge className="bg-rose-100 text-rose-800 border-0 px-4 py-2 text-sm font-semibold shadow-sm">
              Pago Requerido
            </Badge>
          )}
          {paymentStatus === 'PAYMENT_VERIFYING' && (
            <Badge className="bg-amber-100 text-amber-800 border-0 px-4 py-2 text-sm font-semibold shadow-sm">
              Pago en Verificación
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Detalles de la Orden */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                <CardTitle className="text-lg">Detalles del Servicio</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Operador Logístico</h4>
                    <p className="font-semibold text-slate-900 mt-1">{orderMock.storeName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Servicio Contratado</h4>
                    <p className="font-semibold text-slate-900 mt-1">{orderMock.serviceName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Tipo de Carga</h4>
                    <p className="font-semibold text-slate-900 mt-1">Contenedor 40ft Reefer</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Total a Pagar</h4>
                    <p className="font-bold text-xl text-blue-600 mt-1">${orderMock.total.toFixed(2)} USD</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {paymentStatus === 'PAYMENT_VERIFYING' && (
              <Card className="bg-emerald-50 border-emerald-200 shadow-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900">Comprobante de pago recibido</h3>
                    <p className="text-emerald-700 text-sm mt-1">
                      El administrador está verificando tu depósito. Una vez aprobado, el estado cambiará a "En Operación" y el operador será notificado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {paymentStatus === 'PAYMENT_PENDING' && (
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-900 text-white">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5" /> Instrucciones de Pago
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Realiza tu transferencia bancaria a las siguientes cuentas de concentración del Marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Banco</span>
                      <span className="font-bold text-slate-900">{orderMock.bankDetails.bank}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Cuenta</span>
                      <span className="font-bold text-slate-900">{orderMock.bankDetails.account}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-slate-500">CLABE Interbancaria</span>
                      <span className="font-bold text-slate-900">{orderMock.bankDetails.clabe}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3">
                      <span className="text-slate-500">Beneficiario</span>
                      <span className="font-bold text-slate-900">{orderMock.bankDetails.beneficiary}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Columna Derecha: Upload File */}
          <div className="lg:col-span-1">
            {paymentStatus === 'PAYMENT_PENDING' && (
              <Card className="border-blue-200 shadow-lg shadow-blue-500/10">
                <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                  <CardTitle className="text-lg text-blue-900">Validar Pago</CardTitle>
                  <CardDescription>Sube tu recibo o transferencia (PDF, JPG, PNG).</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                  
                  <div className="w-full">
                    <label 
                      htmlFor="payment-file"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
                        <p className="text-sm text-slate-500">
                          {file ? <span className="font-bold text-blue-600">{file.name}</span> : 'Haz clic para subir comprobante'}
                        </p>
                      </div>
                      <input id="payment-file" type="file" className="hidden" accept=".pdf,image/*" onChange={handleFileChange} />
                    </label>
                  </div>

                  <Button 
                    onClick={handleUploadPayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!file || isUploading}
                  >
                    {isUploading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...</>
                    ) : (
                      'Reportar Pago'
                    )}
                  </Button>

                </CardContent>
              </Card>
            )}

            {paymentStatus !== 'PAYMENT_PENDING' && (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                  <CardTitle className="text-lg">Documentos Anexos</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <FileText className="h-6 w-6 text-rose-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">comprobante_banco.pdf</p>
                      <p className="text-xs text-slate-500">Subido el 15 May 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
