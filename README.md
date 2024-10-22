# PTRN-ZARA.COM

## Descripción General

Una aplicación e-commerce desarrollada con Next.js 15, especializada en la venta de teléfonos móviles. Cuenta con renderizado del lado del servidor, sistema de caché inteligente, diseño responsive y un robusto sistema de carrito de compras. La aplicación demuestra las mejores prácticas de desarrollo web moderno con un enfoque en la optimización del rendimiento.

## 🚀 Características Principales

### Experiencia de Compra

-  **Gestión de Productos**

   -  Filtrado dinámico y búsqueda de productos
   -  Actualizaciones de productos en tiempo real
   -  Especificaciones detalladas de productos
   -  Selección de variantes de color y almacenamiento
   -  Recomendaciones de productos relacionados

-  **Carrito de Compras**
   -  Gestión del carrito del lado del cliente con Context API
   -  Almacenamiento persistente usando localStorage
   -  Cálculo de items agrupados
   -  Actualizaciones dinámicas de precios
   -  Interfaz responsive del carrito

### Optimizaciones de Rendimiento

-  **Procesamiento de Imágenes**

   -  Optimización automática de imágenes con Sharp
   -  Conversión a formato WebP
   -  Implementación de carga perezosa
   -  Dimensionamiento responsive de imágenes
   -  Caché de imágenes en base64

-  **Interfaz de Usuario**
   -  Diseño responsive para todos los dispositivos
   -  Estados de carga y esqueletos
   -  Transiciones y animaciones suaves
   -  Notificaciones toast para acciones del usuario
   -  Optimización SEO con metadatos

### Sistema de Caché Avanzado

-  **Gestión Inteligente de Caché**
   -  Sistema de caché basado en MongoDB para respuestas de la API
   -  Implementación del patrón stale-while-revalidate
   -  Actualización de caché en segundo plano
   -  Invalidación de caché después de 1 hora
   -  Caché consciente de búsquedas con soporte para parámetros de consulta

### Acciones del Servidor e Integración API

-  **Gestión Robusta de API**
   -  Llamadas a API del lado del servidor con manejo de errores
   -  Respuestas de API tipadas con TypeScript
   -  Funcionalidad de búsqueda con solicitudes debounced
   -  Pipeline de procesamiento y optimización de imágenes

## 🛠 Stack Tecnológico

### Frontend

-  Next.js 15
-  React Server Components RSC
-  TypeScript
-  CSS
-  Tailwind CSS
-  Context API para gestión de estado

### Integración Backend

-  MongoDB para caché
-  Mongoose ODM
-  Sharp para procesamiento de imágenes
-  Server Actions para llamadas API

### Rendimiento

-  Renderizado del lado del servidor
-  Regeneración Estática Incremental
-  Importaciones dinámicas
-  Entrega optimizada de assets

## 💻 Arquitectura del Código

### Componentes Clave

#### API y Caché (`actions.ts`)

```typescript
// Funcionalidad central para interacción con API y caché
interface FetchOptions {
   search?: string;
   useCache?: boolean;
}

// Función principal de fetch API con capacidades de caché
export async function fetchAPI<T>(endpoint: string, options?: FetchOptions): Promise<T>;
```

El sistema de caché implementa:

-  Generación de claves de caché basada en endpoint y parámetros de búsqueda
-  Determinación de caché fresco/obsoleto
-  Revalidación de caché en segundo plano
-  Manejo de respuestas tipadas

#### Gestión del Carrito

-  Gestión de estado del carrito basada en Context
-  Sincronización con almacenamiento local
-  Agrupación y cálculos de items del carrito
-  Operaciones tipadas del carrito

#### Pipeline de Procesamiento de Imágenes

```typescript
export async function processImage(imageUrl: string): Promise<string> {
   // Flujo de trabajo de optimización de imágenes:
   // 1. Obtener imagen original
   // 2. Procesar con Sharp
   // 3. Convertir a WebP
   // 4. Devolver string en base64
}
```

## 🚀 Comenzando

### Prerrequisitos

-  Node.js 18+
-  Instancia de MongoDB
-  API key para datos de productos

### Configuración del Entorno

```bash
# .env.local
MONGODB_URI=tu_mongodb_uri
API_URL=tu_endpoint_api
API_KEY=tu_api_key
ROOT_DOMAIN=tu_dominio
```

### Instalación

```bash
# Clonar el repositorio
git clone [url-repositorio]

# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar servidor de desarrollo
npm run dev
```

## 📚 Documentación de la API

### Endpoints de Productos

```typescript
// Obtener todos los productos
GET /api/products
Respuesta: ProductTypes[]

// Obtener un producto
GET /api/products/${id}
Respuesta: Product

// Buscar productos
GET /api/products?search=${query}
Respuesta: ProductTypes[]
```

### Principales Tipos de Datos

```typescript
interface ProductTypes {
   id: string;
   brand: string;
   name: string;
   basePrice: number;
   imageUrl: string;
}

interface Product extends ProductTypes {
   description: string;
   rating: number;
   specs: ProductSpecs;
   colorOptions: ColorOption[];
   storageOptions: StorageOption[];
   similarProducts?: SimilarProduct[];
}
```
