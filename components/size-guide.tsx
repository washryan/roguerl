"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface SizeGuideProps {
  category: string
}

export function SizeGuide({ category }: SizeGuideProps) {
  // Determinar qual guia de tamanho mostrar com base na categoria
  const guideType =
    category.toLowerCase().includes("calça") || category.toLowerCase().includes("shorts")
      ? "bottoms"
      : category.toLowerCase().includes("calçado") || category.toLowerCase().includes("sapato")
        ? "shoes"
        : "tops"

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Guia de Tamanhos</h2>
      <p className="text-muted-foreground mb-6">
        Use as tabelas abaixo para encontrar o tamanho perfeito para você. Meça-se conforme indicado nas instruções.
      </p>

      <Tabs defaultValue={guideType}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="tops">Camisetas & Tops</TabsTrigger>
          <TabsTrigger value="bottoms">Calças & Shorts</TabsTrigger>
          <TabsTrigger value="shoes">Calçados</TabsTrigger>
        </TabsList>

        {/* Guia para Camisetas e Tops */}
        <TabsContent value="tops" className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Como medir</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Peito:</strong> Meça a circunferência na parte mais larga do peito, mantendo a fita métrica
              nivelada.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Cintura:</strong> Meça a circunferência natural da cintura, na parte mais estreita do tronco.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Quadril:</strong> Meça a circunferência na parte mais larga dos quadris.
            </p>
          </div>

          <Separator />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2 text-left">Tamanho</th>
                  <th className="border px-4 py-2 text-left">Peito (cm)</th>
                  <th className="border px-4 py-2 text-left">Cintura (cm)</th>
                  <th className="border px-4 py-2 text-left">Quadril (cm)</th>
                  <th className="border px-4 py-2 text-left">Equivalente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">PP</td>
                  <td className="border px-4 py-2">86-90</td>
                  <td className="border px-4 py-2">70-74</td>
                  <td className="border px-4 py-2">90-94</td>
                  <td className="border px-4 py-2">XS</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">P</td>
                  <td className="border px-4 py-2">90-94</td>
                  <td className="border px-4 py-2">74-78</td>
                  <td className="border px-4 py-2">94-98</td>
                  <td className="border px-4 py-2">S</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">M</td>
                  <td className="border px-4 py-2">94-98</td>
                  <td className="border px-4 py-2">78-82</td>
                  <td className="border px-4 py-2">98-102</td>
                  <td className="border px-4 py-2">M</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">G</td>
                  <td className="border px-4 py-2">98-104</td>
                  <td className="border px-4 py-2">82-88</td>
                  <td className="border px-4 py-2">102-108</td>
                  <td className="border px-4 py-2">L</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">GG</td>
                  <td className="border px-4 py-2">104-110</td>
                  <td className="border px-4 py-2">88-94</td>
                  <td className="border px-4 py-2">108-114</td>
                  <td className="border px-4 py-2">XL</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">XGG</td>
                  <td className="border px-4 py-2">110-116</td>
                  <td className="border px-4 py-2">94-100</td>
                  <td className="border px-4 py-2">114-120</td>
                  <td className="border px-4 py-2">XXL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Guia para Calças e Shorts */}
        <TabsContent value="bottoms" className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Como medir</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Cintura:</strong> Meça a circunferência natural da cintura, na parte mais estreita do tronco.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Quadril:</strong> Meça a circunferência na parte mais larga dos quadris.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Entrepernas:</strong> Meça do gancho até a barra da calça, ao longo da costura interna da perna.
            </p>
          </div>

          <Separator />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2 text-left">Tamanho</th>
                  <th className="border px-4 py-2 text-left">Cintura (cm)</th>
                  <th className="border px-4 py-2 text-left">Quadril (cm)</th>
                  <th className="border px-4 py-2 text-left">Entrepernas (cm)</th>
                  <th className="border px-4 py-2 text-left">Equivalente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">36</td>
                  <td className="border px-4 py-2">70-74</td>
                  <td className="border px-4 py-2">90-94</td>
                  <td className="border px-4 py-2">78</td>
                  <td className="border px-4 py-2">XS</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">38</td>
                  <td className="border px-4 py-2">74-78</td>
                  <td className="border px-4 py-2">94-98</td>
                  <td className="border px-4 py-2">79</td>
                  <td className="border px-4 py-2">S</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">40</td>
                  <td className="border px-4 py-2">78-82</td>
                  <td className="border px-4 py-2">98-102</td>
                  <td className="border px-4 py-2">80</td>
                  <td className="border px-4 py-2">M</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">42</td>
                  <td className="border px-4 py-2">82-86</td>
                  <td className="border px-4 py-2">102-106</td>
                  <td className="border px-4 py-2">81</td>
                  <td className="border px-4 py-2">L</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">44</td>
                  <td className="border px-4 py-2">86-90</td>
                  <td className="border px-4 py-2">106-110</td>
                  <td className="border px-4 py-2">82</td>
                  <td className="border px-4 py-2">XL</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">46</td>
                  <td className="border px-4 py-2">90-94</td>
                  <td className="border px-4 py-2">110-114</td>
                  <td className="border px-4 py-2">83</td>
                  <td className="border px-4 py-2">XXL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Guia para Calçados */}
        <TabsContent value="shoes" className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Como medir</h3>
            <p className="text-sm text-muted-foreground">
              <strong>Comprimento do pé:</strong> Meça da ponta do dedo mais longo até o calcanhar, com o pé apoiado no
              chão.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Largura do pé:</strong> Meça a parte mais larga do pé, geralmente na região dos metatarsos.
            </p>
          </div>

          <Separator />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2 text-left">BR</th>
                  <th className="border px-4 py-2 text-left">EU</th>
                  <th className="border px-4 py-2 text-left">US (Homem)</th>
                  <th className="border px-4 py-2 text-left">US (Mulher)</th>
                  <th className="border px-4 py-2 text-left">UK</th>
                  <th className="border px-4 py-2 text-left">Comprimento (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-medium">35</td>
                  <td className="border px-4 py-2">35</td>
                  <td className="border px-4 py-2">3.5</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">2.5</td>
                  <td className="border px-4 py-2">22.5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">36</td>
                  <td className="border px-4 py-2">36</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">5.5</td>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">23</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">37</td>
                  <td className="border px-4 py-2">37</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">6.5</td>
                  <td className="border px-4 py-2">4</td>
                  <td className="border px-4 py-2">23.5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">38</td>
                  <td className="border px-4 py-2">38</td>
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">7.5</td>
                  <td className="border px-4 py-2">5</td>
                  <td className="border px-4 py-2">24</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">39</td>
                  <td className="border px-4 py-2">39</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">8.5</td>
                  <td className="border px-4 py-2">6</td>
                  <td className="border px-4 py-2">25</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">40</td>
                  <td className="border px-4 py-2">40</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">9.5</td>
                  <td className="border px-4 py-2">7</td>
                  <td className="border px-4 py-2">25.5</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">41</td>
                  <td className="border px-4 py-2">41</td>
                  <td className="border px-4 py-2">8.5</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">7.5</td>
                  <td className="border px-4 py-2">26</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">42</td>
                  <td className="border px-4 py-2">42</td>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">10.5</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">27</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-medium">43</td>
                  <td className="border px-4 py-2">43</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">11.5</td>
                  <td className="border px-4 py-2">9</td>
                  <td className="border px-4 py-2">27.5</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border px-4 py-2 font-medium">44</td>
                  <td className="border px-4 py-2">44</td>
                  <td className="border px-4 py-2">11</td>
                  <td className="border px-4 py-2">12.5</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">28.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 rounded-md bg-muted p-4">
        <h3 className="font-medium mb-2">Dicas para encontrar o tamanho perfeito</h3>
        <ul className="space-y-1 text-sm">
          <li>• Se você estiver entre dois tamanhos, escolha o maior para um ajuste mais confortável.</li>
          <li>• As medidas podem variar ligeiramente dependendo do estilo e do material do produto.</li>
          <li>• Para roupas que tendem a encolher, como algodão 100%, considere comprar um tamanho maior.</li>
          <li>• Em caso de dúvida, consulte as medidas específicas listadas na descrição do produto.</li>
        </ul>
      </div>
    </div>
  )
}
