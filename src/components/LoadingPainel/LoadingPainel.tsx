/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function LoadingPainel({ orderData, onClose, pixData }: any) {
    const [isCopying, setIsCopying] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending')
    const [address, setAddress] = useState({
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        orderId: ''
    })

    const isApproved = paymentStatus === 'approved'

    type PaymentStatus = 'pending' | 'approved' | 'rejected'

    useEffect(() => {
        let intervalId: NodeJS.Timeout

        if (pixData?.id && paymentStatus === 'approved') {
            const checkPaymentStatus = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gateway/status/${pixData.id}`)
                    const data = await response.json()
                    
                    const newStatus = data.status.toLowerCase() 

                    if (newStatus === 'approved') {
                        setPaymentStatus('approved')
                    } else if (newStatus === 'rejected' || newStatus === 'cancelled') {
                        setPaymentStatus('rejected')
                    }
                } catch (error) {
                    toast.error(`Erro ao checar status do pagamento: ${error}`)
                }
            }
            
            intervalId = setInterval(checkPaymentStatus, 5000)
        }
        return () => {
            if (intervalId)
                clearInterval(intervalId)
        }
    }, [pixData, paymentStatus])

    useEffect(() => {
        if (paymentStatus === 'approved') {
            setTimeout(() => {
                toast.success('Pagamento Aprovado! Redirecionando..')
                window.location.href = '/'
            }, 50000)
        } else if (paymentStatus === 'rejected') {
            setTimeout(() => {
                toast.error('Pagamento não aprovado! Por favor tente novamente')
                onClose()
            }, 5000)
        }
    }, [onClose, paymentStatus])

    const handleCEP = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const addressData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cep: address.cep,
                rua: address.street,
                numero: address.number,
                bairro: address.neighborhood,
                complemento: address.complement,
                orderId: orderData[0]._id
            })
        })

        if (addressData.ok) {
            toast.success('Endereço cadastrado com sucesso! Redirecionando...')
            onClose() 
            window.location.reload()
        }
    }

    const copyToClipboard = () => {
        if (pixData?.qr_code) {
            navigator.clipboard.writeText(pixData.qr_code)
            setIsCopying(true)
            setTimeout(() => setIsCopying(false), 2000)
        }
    }
    
    const fetchCepData = useCallback(async (cep: string) => {
        const cleanedCep = cep.replace(/\D/g, '') 

        if (cleanedCep.length !== 8) {
            return
        }

        try {
            toast(`Buscando CEP: ${cleanedCep}`)
            const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
            const data = await response.json()

            if (data.erro) {
                toast.error('CEP não encontrado. Por favor, preencha manualmente.')
            } else {
                setAddress(prev => ({
                    ...prev,
                    street: data.logradouro || '',
                    neighborhood: data.bairro || '',
                }))
            }
        } catch (error) {
            toast.error(`Erro ao buscar CEP: ${error}`)
            toast('Erro na comunicação com o serviço de CEP.')
        }
    }, [])

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        setAddress(prev => ({ ...prev, [name]: value }))

        if (name === 'cep') {
            const cleanedValue = value.replace(/\D/g, '') 
            
            if (cleanedValue.length === 8) {
                fetchCepData(cleanedValue)
            }
        }
    }

    if (!pixData) {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Toaster />
                <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    <h2 className="text-lg font-semibold mt-4">Gerando Pix...</h2>
                </div>
            </div>
        )
    }

    if (isApproved) {
        return(
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Toaster />
                <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">✅ Pagamento Aprovado!</h2>
                    <p className="text-lg font-semibold mb-6">Agora, precisamos do endereço para envio.</p>

                    <form onSubmit={handleCEP} className="w-full space-y-4">                        
                        <div className="flex flex-col">
                            <label htmlFor="cep" className="text-sm font-medium mb-1">CEP</label>
                            <input
                                id="cep"
                                name="cep"
                                type="text"
                                value={address.cep.replace(/(\d{5})(\d)/, '$1-$2')} 
                                onChange={handleAddressChange}
                                maxLength={9}
                                className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col flex-grow-[2]">
                                <label htmlFor="street" className="text-sm font-medium mb-1">Rua/Avenida</label>
                                <input
                                    id="street"
                                    name="street"
                                    type="text"
                                    value={address.street}
                                    onChange={handleAddressChange}
                                    
                                    className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex flex-col flex-grow-[1] max-w-[100px]">
                                <label htmlFor="number" className="text-sm font-medium mb-1">Número</label>
                                <input
                                    id="number"
                                    name="number"
                                    type="text"
                                    value={address.number}
                                    onChange={handleAddressChange}
                                    
                                    className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="neighborhood" className="text-sm font-medium mb-1">Bairro</label>
                            <input
                                id="neighborhood"
                                name="neighborhood"
                                type="text"
                                value={address.neighborhood}
                                onChange={handleAddressChange}
                                
                                className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="complement" className="text-sm font-medium mb-1">Complemento (Opcional)</label>
                            <input
                                id="complement"
                                name="complement"
                                type="text"
                                value={address.complement}
                                onChange={handleAddressChange}
                                className="p-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 px-6 py-3 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-600 transition duration-300"
                        >
                            Salvar Endereço e Finalizar Pedido
                        </button>
                    </form>
                </div>
            </div>
        )
    }

        return(
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Toaster />
                <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-lg flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Pagamento Pix</h2>
                    
                    <div className="w-full text-center mb-6">
                        <p className="text-xl font-semibold">Valor: <span className="text-orange-600">R$ {pixData.valor?.toFixed(2) || '0.00'}</span></p>
                    </div>

                    <div className="w-full max-w-[300px] mb-6 border p-2 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">1. Escaneie o QR Code:</h3>
                        <div className="w-full flex justify-center">
                            <img 
                                src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} 
                                alt="QR Code Pix" 
                                className="w-48 h-48 border border-gray-300 p-1"
                            />
                        </div>
                    </div>
                    <div className="w-full mb-6">
                        <h3 className="text-lg font-semibold mb-2">2. Copie o Código:</h3>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                readOnly
                                value={pixData.qr_code}
                                className="flex-1 p-2 border border-gray-300 rounded text-sm bg-gray-100 overflow-x-scroll whitespace-nowrap"
                                placeholder="Código Pix Copia e Cola"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`px-4 py-2 text-white font-bold rounded transition duration-300 ${isCopying ? 'bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                            >
                                {isCopying ? 'Copiado! ✅' : 'Copiar'}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">Aguardando confirmação de pagamento. Você pode fechar este painel e acompanhar seu pedido.</p>
                    
                    <button
                        onClick={onClose}
                        className="mt-4 px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-300"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        )           
}