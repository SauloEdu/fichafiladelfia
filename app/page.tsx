"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check, User, Heart, Phone } from "lucide-react"
import Image from "next/image"
import React from "react"

interface FormData {
  // Responsável Financeiro
  responsavel: {
    nome: string
    dataNascimento: string
    sexo: string
    estadoCivil: string
    rg: string
    orgaoEmissor: string
    dataEmissao: string
    cpf: string
    nacionalidade: string
    naturalidade: string
    endereco: {
      rua: string
      numero: string
      complemento: string
      bairro: string
      cep: string
      cidade: string
      estado: string
    }
    telefoneFixo: string
    telefoneCelular: string
    email: string
  }
  // Aluno
  aluno: {
    nomeCompleto: string
    dataNascimento: string
    sexo: string
    estadoCivil: string
    rg: string
    cpf: string
    nacionalidade: string
    naturalidade: string
    endereco: {
      rua: string
      numero: string
      bairro: string
      cep: string
      cidadeEstado: string
    }
    telefoneFixo: string
    telefoneCelular: string
    email: string
    saude: {
      alergias: string
      condicoesMedicas: string
      medicacoes: string
      necessidadesEspeciais: string
    }
    emergencia: {
      nomeContato: string
      telefoneContato: string
    }
    enderecoIgual: boolean
  }
}

const steps = [
  { id: 1, title: "Responsável Financeiro", icon: User, description: "Dados do responsável" },
  { id: 2, title: "Dados do Aluno", icon: User, description: "Informações pessoais" },
  { id: 3, title: "Dados de Saúde", icon: Heart, description: "Informações médicas" },
  { id: 4, title: "Contato de Emergência", icon: Phone, description: "Contato para emergências" },
  { id: 5, title: "Revisão", icon: Check, description: "Conferir dados" },
]

export default function FormularioAluno() {
  const searchParams = useSearchParams()
  const numeroCliente = searchParams.get("numeroCliente") || ""

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    responsavel: {
      nome: "",
      dataNascimento: "",
      sexo: "",
      estadoCivil: "",
      rg: "",
      orgaoEmissor: "",
      dataEmissao: "",
      cpf: "",
      nacionalidade: "",
      naturalidade: "",
      endereco: {
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
      },
      telefoneFixo: "",
      telefoneCelular: "",
      email: "",
    },
    aluno: {
      nomeCompleto: "",
      dataNascimento: "",
      sexo: "",
      estadoCivil: "",
      rg: "",
      cpf: "",
      nacionalidade: "",
      naturalidade: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cep: "",
        cidadeEstado: "",
      },
      telefoneFixo: "",
      telefoneCelular: "",
      email: "",
      saude: {
        alergias: "",
        condicoesMedicas: "",
        medicacoes: "",
        necessidadesEspeciais: "",
      },
      emergencia: {
        nomeContato: "",
        telefoneContato: "",
      },
      enderecoIgual: false,
    },
  })

  const [enderecoIgual, setEnderecoIgual] = useState(false)

  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
      .replace(/(-\d{4})\d+?$/, "$1")
  }

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1")
  }

  const maskRG = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .slice(0, 12) // Limita a 12 caracteres (##.###.###-#)
  }

  const validateStep = (step: number): boolean => {
    console.log("[v0] Validating step:", step)
    console.log("[v0] Form data:", formData)

    switch (step) {
      case 1:
        return !!(
          formData.responsavel.nome &&
          formData.responsavel.dataNascimento &&
          formData.responsavel.sexo &&
          formData.responsavel.rg &&
          formData.responsavel.cpf &&
          formData.responsavel.endereco.rua &&
          formData.responsavel.endereco.numero &&
          formData.responsavel.endereco.bairro &&
          formData.responsavel.endereco.cep &&
          formData.responsavel.endereco.cidade &&
          formData.responsavel.endereco.estado &&
          formData.responsavel.telefoneCelular &&
          formData.responsavel.email
        )
      case 2:
        console.log("[v0] Student name:", formData.aluno.nomeCompleto)
        console.log("[v0] Student birth date:", formData.aluno.dataNascimento)
        console.log("[v0] Student gender:", formData.aluno.sexo)
        console.log("[v0] Student CPF:", formData.aluno.cpf)
        console.log("[v0] Student RG:", formData.aluno.rg)

        const alunoValid = !!(
          formData.aluno.nomeCompleto &&
          formData.aluno.dataNascimento &&
          formData.aluno.sexo &&
          formData.aluno.cpf &&
          formData.aluno.rg
        )

        const enderecoValid =
          formData.aluno.enderecoIgual ||
          !!(
            formData.aluno.endereco.rua &&
            formData.aluno.endereco.numero &&
            formData.aluno.endereco.bairro &&
            formData.aluno.endereco.cep &&
            formData.aluno.endereco.cidadeEstado
          )

        console.log("[v0] Aluno valid:", alunoValid)
        console.log("[v0] Endereco valid:", enderecoValid)
        console.log("[v0] Endereco igual:", formData.aluno.enderecoIgual)

        return alunoValid && enderecoValid
      case 3:
        return true // Dados de saúde são opcionais
      case 4:
        return !!(formData.aluno.emergencia.nomeContato && formData.aluno.emergencia.telefoneContato)
      default:
        return false
    }
  }

  const updateFormData = (section: keyof FormData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedFormData = (section: keyof FormData, subsection: string, field: string, value: string) => {
    setFormData((prev) => {
      const sectionData = prev[section]
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [subsection]: {
            ...(sectionData[subsection as keyof typeof sectionData] as Record<string, any>),
            [field]: value,
          },
        },
      }
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const webhookData = {
        numeroCliente,
        ...formData,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch(
        "https://n8neditor.escolafiladelfia.com.br/webhook/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        },
      )

      if (response.ok) {
        alert("Cadastro realizado com sucesso!")
        window.location.href = "https://wa.me/5591984990404"
      } else {
        throw new Error("Erro ao enviar dados")
      }
    } catch (error) {
      alert("Erro ao enviar o formulário. Tente novamente.")
      console.error("Erro:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / steps.length) * 100

  const copyAddressFromResponsavel = () => {
    setFormData((prev) => ({
      ...prev,
      aluno: {
        ...prev.aluno,
        endereco: {
          ...prev.responsavel.endereco,
          cidadeEstado: `${prev.responsavel.endereco.cidade}/${prev.responsavel.endereco.estado}`,
        },
        enderecoIgual: true,
      },
    }))
  }

  const handleEnderecoIgualChange = (checked: boolean) => {
    setEnderecoIgual(checked)
    if (checked) {
      copyAddressFromResponsavel()
    } else {
      setFormData((prev) => ({
        ...prev,
        aluno: {
          ...prev.aluno,
          enderecoIgual: false,
        },
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo-filadelfia.png"
              alt="Centro Educacional Filadelfia"
              width={120}
              height={120}
              className="rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Centro Educacional Filadelfia</h1>
          <p className="text-gray-600">Ficha de Cadastro do Aluno</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs text-center font-medium ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Responsável Financeiro */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="resp-nome" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </Label>
                    <Input
                      id="resp-nome"
                      value={formData.responsavel.nome}
                      onChange={(e) => updateFormData("responsavel", "nome", e.target.value)}
                      placeholder="Nome completo do responsável"
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resp-nascimento" className="text-sm font-medium text-gray-700">
                      Data de Nascimento *
                    </Label>
                    <Input
                      id="resp-nascimento"
                      type="date"
                      value={formData.responsavel.dataNascimento}
                      onChange={(e) => updateFormData("responsavel", "dataNascimento", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Sexo *</Label>
                  <RadioGroup
                    value={formData.responsavel.sexo}
                    onValueChange={(value) => updateFormData("responsavel", "sexo", value)}
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="masculino" id="resp-masc" />
                      <Label htmlFor="resp-masc">Masculino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="feminino" id="resp-fem" />
                      <Label htmlFor="resp-fem">Feminino</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outro" id="resp-outro" />
                      <Label htmlFor="resp-outro">Outro</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="resp-civil" className="text-sm font-medium text-gray-700">
                      Estado Civil
                    </Label>
                    <Input
                      id="resp-civil"
                      value={formData.responsavel.estadoCivil}
                      onChange={(e) => updateFormData("responsavel", "estadoCivil", e.target.value)}
                      placeholder="Ex: Solteiro, Casado, Divorciado"
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resp-rg" className="text-sm font-medium text-gray-700">
                      RG *
                    </Label>
                    <Input
                      id="resp-rg"
                      value={formData.responsavel.rg}
                      onChange={(e) => updateFormData("responsavel", "rg", maskRG(e.target.value))}
                      placeholder="00.000.000-0"
                      className="mt-1"
                      maxLength={12}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="resp-orgao" className="text-sm font-medium text-gray-700">
                      Órgão Emissor
                    </Label>
                    <Input
                      id="resp-orgao"
                      value={formData.responsavel.orgaoEmissor}
                      onChange={(e) => updateFormData("responsavel", "orgaoEmissor", e.target.value)}
                      placeholder="Ex: SSP/SP"
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resp-emissao" className="text-sm font-medium text-gray-700">
                      Data de Emissão
                    </Label>
                    <Input
                      id="resp-emissao"
                      type="date"
                      value={formData.responsavel.dataEmissao}
                      onChange={(e) => updateFormData("responsavel", "dataEmissao", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="resp-cpf" className="text-sm font-medium text-gray-700">
                      CPF *
                    </Label>
                    <Input
                      id="resp-cpf"
                      value={formData.responsavel.cpf}
                      onChange={(e) => updateFormData("responsavel", "cpf", maskCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      className="mt-1"
                      maxLength={14}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resp-nacionalidade" className="text-sm font-medium text-gray-700">
                      Nacionalidade
                    </Label>
                    <Input
                      id="resp-nacionalidade"
                      value={formData.responsavel.nacionalidade}
                      onChange={(e) => updateFormData("responsavel", "nacionalidade", e.target.value)}
                      placeholder="Ex: Brasileira"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resp-naturalidade" className="text-sm font-medium text-gray-700">
                    Naturalidade (Cidade/Estado)
                  </Label>
                  <Input
                    id="resp-naturalidade"
                    value={formData.responsavel.naturalidade}
                    onChange={(e) => updateFormData("responsavel", "naturalidade", e.target.value)}
                    placeholder="Ex: São Paulo/SP"
                    className="mt-1"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Endereço Residencial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="resp-rua" className="text-sm font-medium text-gray-700">
                        Rua/Logradouro *
                      </Label>
                      <Input
                        id="resp-rua"
                        value={formData.responsavel.endereco.rua}
                        onChange={(e) => updateNestedFormData("responsavel", "endereco", "rua", e.target.value)}
                        placeholder="Nome da rua"
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resp-numero" className="text-sm font-medium text-gray-700">
                        Número *
                      </Label>
                      <Input
                        id="resp-numero"
                        value={formData.responsavel.endereco.numero}
                        onChange={(e) => updateNestedFormData("responsavel", "endereco", "numero", e.target.value)}
                        placeholder="Nº"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="resp-complemento" className="text-sm font-medium text-gray-700">
                        Complemento
                      </Label>
                      <Input
                        id="resp-complemento"
                        value={formData.responsavel.endereco.complemento}
                        onChange={(e) => updateNestedFormData("responsavel", "endereco", "complemento", e.target.value)}
                        placeholder="Apto, Bloco, etc."
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resp-bairro" className="text-sm font-medium text-gray-700">
                        Bairro *
                      </Label>
                      <Input
                        id="resp-bairro"
                        value={formData.responsavel.endereco.bairro}
                        onChange={(e) => updateNestedFormData("responsavel", "endereco", "bairro", e.target.value)}
                        placeholder="Nome do bairro"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="resp-cep" className="text-sm font-medium text-gray-700">
                        CEP *
                      </Label>
                      <Input
                        id="resp-cep"
                        value={formData.responsavel.endereco.cep}
                        onChange={(e) =>
                          updateNestedFormData("responsavel", "endereco", "cep", maskCEP(e.target.value))
                        }
                        placeholder="00000-000"
                        className="mt-1"
                        maxLength={9}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resp-cidade" className="text-sm font-medium text-gray-700">
                        Cidade *
                      </Label>
                      <Input
                        id="resp-cidade"
                        value={formData.responsavel.endereco.cidade}
                        onChange={(e) => updateNestedFormData("responsavel", "endereco", "cidade", e.target.value)}
                        placeholder="Nome da cidade"
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resp-estado" className="text-sm font-medium text-gray-700">
                        Estado *
                      </Label>
                      <Input
                        id="resp-estado"
                        value={formData.responsavel.endereco.estado}
                        onChange={(e) => updateNestedFormData("responsavel", "endereco", "estado", e.target.value)}
                        placeholder="Ex: SP"
                        className="mt-1"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="resp-fixo" className="text-sm font-medium text-gray-700">
                      Telefone Fixo
                    </Label>
                    <Input
                      id="resp-fixo"
                      value={formData.responsavel.telefoneFixo}
                      onChange={(e) => updateFormData("responsavel", "telefoneFixo", maskPhone(e.target.value))}
                      placeholder="(11) 1234-5678"
                      className="mt-1"
                      maxLength={14}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resp-celular" className="text-sm font-medium text-gray-700">
                      Telefone Celular *
                    </Label>
                    <Input
                      id="resp-celular"
                      value={formData.responsavel.telefoneCelular}
                      onChange={(e) => updateFormData("responsavel", "telefoneCelular", maskPhone(e.target.value))}
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                      maxLength={15}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resp-email" className="text-sm font-medium text-gray-700">
                    E-mail *
                  </Label>
                  <Input
                    id="resp-email"
                    type="email"
                    value={formData.responsavel.email}
                    onChange={(e) => updateFormData("responsavel", "email", e.target.value)}
                    placeholder="email@exemplo.com"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Dados Pessoais do Aluno */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="aluno-nome" className="text-sm font-medium text-gray-700">
                      Nome Completo *
                    </Label>
                    <Input
                      id="aluno-nome"
                      value={formData.aluno.nomeCompleto}
                      onChange={(e) => updateFormData("aluno", "nomeCompleto", e.target.value)}
                      placeholder="Nome completo do aluno"
                      className="mt-1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aluno-nascimento" className="text-sm font-medium text-gray-700">
                      Data de Nascimento *
                    </Label>
                    <Input
                      id="aluno-nascimento"
                      type="date"
                      value={formData.aluno.dataNascimento}
                      onChange={(e) => updateFormData("aluno", "dataNascimento", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="aluno-cpf" className="text-sm font-medium text-gray-700">
                      CPF *
                    </Label>
                    <Input
                      id="aluno-cpf"
                      value={formData.aluno.cpf}
                      onChange={(e) => updateFormData("aluno", "cpf", maskCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      className="mt-1"
                      maxLength={14}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aluno-rg" className="text-sm font-medium text-gray-700">
                      RG *
                    </Label>
                    <Input
                      id="aluno-rg"
                      value={formData.aluno.rg}
                      onChange={(e) => updateFormData("aluno", "rg", maskRG(e.target.value))}
                      placeholder="00.000.000-0"
                      className="mt-1"
                      maxLength={12}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aluno-sexo" className="text-sm font-medium text-gray-700">
                      Sexo *
                    </Label>
                    <select
                      id="aluno-sexo"
                      value={formData.aluno.sexo}
                      onChange={(e) => updateFormData("aluno", "sexo", e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="endereco-igual"
                      checked={enderecoIgual}
                      onChange={(e) => handleEnderecoIgualChange(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="endereco-igual" className="text-sm font-medium text-gray-700">
                      Endereço igual ao do Responsável Financeiro
                    </Label>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800">Endereço Residencial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="aluno-rua" className="text-sm font-medium text-gray-700">
                        Rua/Logradouro *
                      </Label>
                      <Input
                        id="aluno-rua"
                        value={formData.aluno.endereco.rua}
                        onChange={(e) => updateNestedFormData("aluno", "endereco", "rua", e.target.value)}
                        placeholder="Nome da rua"
                        className="mt-1"
                        disabled={enderecoIgual}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aluno-numero" className="text-sm font-medium text-gray-700">
                        Número da Residência *
                      </Label>
                      <Input
                        id="aluno-numero"
                        value={formData.aluno.endereco.numero}
                        onChange={(e) => updateNestedFormData("aluno", "endereco", "numero", e.target.value)}
                        placeholder="Nº"
                        className="mt-1"
                        disabled={enderecoIgual}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="aluno-bairro" className="text-sm font-medium text-gray-700">
                        Bairro *
                      </Label>
                      <Input
                        id="aluno-bairro"
                        value={formData.aluno.endereco.bairro}
                        onChange={(e) => updateNestedFormData("aluno", "endereco", "bairro", e.target.value)}
                        placeholder="Nome do bairro"
                        className="mt-1"
                        disabled={enderecoIgual}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aluno-cep" className="text-sm font-medium text-gray-700">
                        CEP *
                      </Label>
                      <Input
                        id="aluno-cep"
                        value={formData.aluno.endereco.cep}
                        onChange={(e) => updateNestedFormData("aluno", "endereco", "cep", maskCEP(e.target.value))}
                        placeholder="00000-000"
                        className="mt-1"
                        maxLength={9}
                        disabled={enderecoIgual}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aluno-cidade-estado" className="text-sm font-medium text-gray-700">
                      Cidade/Estado *
                    </Label>
                    <Input
                      id="aluno-cidade-estado"
                      value={formData.aluno.endereco.cidadeEstado}
                      onChange={(e) => updateNestedFormData("aluno", "endereco", "cidadeEstado", e.target.value)}
                      placeholder="Ex: São Paulo/SP"
                      className="mt-1"
                      disabled={enderecoIgual}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aluno-telefone" className="text-sm font-medium text-gray-700">
                    Telefone
                  </Label>
                  <Input
                    id="aluno-telefone"
                    value={formData.aluno.telefoneCelular}
                    onChange={(e) => updateFormData("aluno", "telefoneCelular", maskPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                    maxLength={15}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Dados de Saúde */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="alergias" className="text-sm font-medium text-gray-700">
                    Alergias
                  </Label>
                  <Textarea
                    id="alergias"
                    value={formData.aluno.saude.alergias}
                    onChange={(e) => updateNestedFormData("aluno", "saude", "alergias", e.target.value)}
                    placeholder="Descreva as alergias conhecidas do aluno"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condicoes" className="text-sm font-medium text-gray-700">
                    Condições Médicas
                  </Label>
                  <Textarea
                    id="condicoes"
                    value={formData.aluno.saude.condicoesMedicas}
                    onChange={(e) => updateNestedFormData("aluno", "saude", "condicoesMedicas", e.target.value)}
                    placeholder="Descreva condições médicas relevantes"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicacoes" className="text-sm font-medium text-gray-700">
                    Medicações em Uso
                  </Label>
                  <Textarea
                    id="medicacoes"
                    value={formData.aluno.saude.medicacoes}
                    onChange={(e) => updateNestedFormData("aluno", "saude", "medicacoes", e.target.value)}
                    placeholder="Liste as medicações que o aluno utiliza regularmente"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="necessidades" className="text-sm font-medium text-gray-700">
                    Necessidades Especiais
                  </Label>
                  <Textarea
                    id="necessidades"
                    value={formData.aluno.saude.necessidadesEspeciais}
                    onChange={(e) => updateNestedFormData("aluno", "saude", "necessidadesEspeciais", e.target.value)}
                    placeholder="Descreva necessidades especiais (cadeirante, dificuldades de aprendizagem, etc.)"
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Contato de Emergência */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contato-nome" className="text-sm font-medium text-gray-700">
                    Nome do Contato de Emergência *
                  </Label>
                  <Input
                    id="contato-nome"
                    value={formData.aluno.emergencia.nomeContato}
                    onChange={(e) => updateNestedFormData("aluno", "emergencia", "nomeContato", e.target.value)}
                    placeholder="Nome completo do contato"
                    className="mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contato-telefone" className="text-sm font-medium text-gray-700">
                    Telefone do Contato de Emergência *
                  </Label>
                  <Input
                    id="contato-telefone"
                    value={formData.aluno.emergencia.telefoneContato}
                    onChange={(e) =>
                      updateNestedFormData("aluno", "emergencia", "telefoneContato", maskPhone(e.target.value))
                    }
                    placeholder="(11) 99999-9999"
                    className="mt-1"
                    maxLength={15}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Revisão */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">Dados do Responsável Financeiro</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <strong>Nome:</strong> {formData.responsavel.nome}
                    </p>
                    <p>
                      <strong>CPF:</strong> {formData.responsavel.cpf}
                    </p>
                    <p>
                      <strong>E-mail:</strong> {formData.responsavel.email}
                    </p>
                    <p>
                      <strong>Celular:</strong> {formData.responsavel.telefoneCelular}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">Dados do Aluno</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <strong>Nome:</strong> {formData.aluno.nomeCompleto}
                    </p>
                    <p>
                      <strong>Data de Nascimento:</strong> {formData.aluno.dataNascimento}
                    </p>
                    <p>
                      <strong>Sexo:</strong> {formData.aluno.sexo}
                    </p>
                    <p>
                      <strong>E-mail:</strong> {formData.aluno.email}
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-red-800">Contato de Emergência</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <strong>Nome:</strong> {formData.aluno.emergencia.nomeContato}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {formData.aluno.emergencia.telefoneContato}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Número do Cliente:</strong> {numeroCliente || "Não informado"}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              {currentStep < steps.length ? (
                <Button onClick={nextStep} className="flex items-center gap-2" disabled={!validateStep(currentStep)}>
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
