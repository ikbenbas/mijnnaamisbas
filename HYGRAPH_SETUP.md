# Hygraph Content Models Setup

This guide explains how to create the content models in Hygraph for the mijnnaamisbas project.

## Prerequisites

1. Create a free account at [Hygraph](https://hygraph.com)
2. Create a new project
3. Navigate to **Schema** in the left sidebar

---

## Content Models

### 1. Bookmark Model

**Model Name:** `Bookmark`
**API ID:** `Bookmark` (plural: `Bookmarks`)

| Field Name | Type | API ID | Required | Unique | Description |
|------------|------|--------|----------|--------|-------------|
| Title | Single line text | `title` | ✅ | — | The bookmark title |
| Slug | Single line text | `slug` | ✅ | ✅ | URL-friendly identifier |
| Description | Multi-line text | `description` | — | — | Optional description |
| Link | Single line text | `link` | ✅ | ✅ | The URL being bookmarked |
| Read | Boolean | `read` | ✅ | — | Whether you've read/visited it |
| Private | Boolean | `private` | ✅ | — | Whether it's private |

**Default Values:**
- `read`: `false`
- `private`: `false`

**References (add after creating other models):**
- `tags`: Reference to `Tag` (Allow multiple values)
- `type`: Reference to `BookmarkGroup` (Allow one value)

---

### 2. BookmarkGroup Model

**Model Name:** `BookmarkGroup`
**API ID:** `BookmarkGroup` (plural: `BookmarkGroups`)

| Field Name | Type | API ID | Required | Unique | Description |
|------------|------|--------|----------|--------|-------------|
| Title | Single line text | `title` | ✅ | — | The group name |
| Slug | Single line text | `slug` | ✅ | ✅ | URL-friendly identifier |
| Description | Multi-line text | `description` | — | — | Optional description |

---

### 3. Tag Model

**Model Name:** `Tag`
**API ID:** `Tag` (plural: `Tags`)

| Field Name | Type | API ID | Required | Unique | Description |
|------------|------|--------|----------|--------|-------------|
| Tag | Single line text | `tag` | ✅ | ✅ | The tag name |

---

### 4. EspressoNote Model

**Model Name:** `EspressoNote`
**API ID:** `EspressoNote` (plural: `EspressoNotes`)

| Field Name | Type | API ID | Required | Validations | Description |
|------------|------|--------|----------|-------------|-------------|
| Title | Single line text | `title` | ✅ | — | Short description |
| Date | Date | `date` | ✅ | — | Date of the shot |
| Bean | Single line text | `bean` | ✅ | — | Bean name/origin |
| Roaster | Single line text | `roaster` | — | — | Roastery name |
| Grind Size | Float | `grindSize` | — | Min: 0 | Machine-specific setting |
| Dosage | Float | `dosage` | ✅ | Min: 0 | Input weight (grams) |
| Yield | Float | `yield` | ✅ | Min: 0 | Output weight (grams) |
| Brew Time | Int | `brewTime` | ✅ | Min: 0 | Extraction time (seconds) |
| Temperature | Float | `temperature` | — | Min: 0, Max: 100 | Water temp (°C) |
| Pressure | Float | `pressure` | — | Min: 0 | Pump pressure (bar) |
| Notes | Multi-line text | `notes` | — | — | Tasting notes |
| Rating | Int | `rating` | — | Min: 1, Max: 5 | Star rating |
| Method Type | Enumeration | `methodType` | ✅ | — | Brewing method |

**Enumeration Values for Method Type:**
- `Espresso`
- `Pour_Over`
- `French_Press`
- `Aeropress`
- `Cold_Brew`
- `Mocha_Pot`

---

## Step-by-Step Creation Guide

### Step 1: Create the Tag Model

1. Go to **Schema** → **Create Model**
2. Name: `Tag`
3. API ID: `Tag` (auto-generated)
4. Click **Add Field**:
   - Type: **Single line text**
   - Display name: `Tag`
   - API ID: `tag`
   - Check ✅ **Required**
   - Check ✅ **Unique**
   - Click **Create**
5. Click **Save Model**

### Step 2: Create the BookmarkGroup Model

1. **Create Model** → Name: `BookmarkGroup`
2. Add fields:
   - **Single line text**: `title` (required)
   - **Single line text**: `slug` (required, unique)
   - **Multi-line text**: `description` (optional)
3. **Save Model**

### Step 3: Create the Bookmark Model

1. **Create Model** → Name: `Bookmark`
2. Add fields:
   - **Single line text**: `title` (required)
   - **Single line text**: `slug` (required, unique)
   - **Multi-line text**: `description` (optional)
   - **Single line text**: `link` (required, unique)
   - **Boolean**: `read` (required, default: false)
   - **Boolean**: `private` (required, default: false)
3. Add references:
   - **Reference**:
     - Display name: `Tags`
     - API ID: `tags`
     - Reference model: `Tag`
     - ✅ Allow multiple Tags
     - Two-way reference field: `bookmarks`
   - **Reference**:
     - Display name: `Type`
     - API ID: `type`
     - Reference model: `BookmarkGroup`
     - ❌ Allow only one BookmarkGroup
     - Two-way reference field: `bookmarks`
4. **Save Model**

### Step 4: Create the EspressoNote Model

1. **Create Model** → Name: `EspressoNote`
2. Add string fields:
   - **Single line text**: `title` (required)
   - **Single line text**: `bean` (required)
   - **Single line text**: `roaster` (optional)
3. Add numeric fields:
   - **Float**: `grindSize` (optional, min: 0)
   - **Float**: `dosage` (required, min: 0)
   - **Float**: `yield` (required, min: 0)
   - **Int**: `brewTime` (required, min: 0)
   - **Float**: `temperature` (optional, min: 0, max: 100)
   - **Float**: `pressure` (optional, min: 0)
   - **Int**: `rating` (optional, min: 1, max: 5)
4. Add other fields:
   - **Date**: `date` (required)
   - **Multi-line text**: `notes` (optional)
   - **Enumeration**: `methodType` (required)
     - Add enumeration values: `Espresso`, `Pour_Over`, `French_Press`, `Aeropress`, `Cold_Brew`, `Mocha_Pot`
5. **Save Model**

---

## API Access Setup

### Step 1: Get Your API Endpoint

1. Go to **Settings** → **API Access**
2. Under **Endpoints**, find your **Content API**
3. Copy the URL (looks like: `https://YOUR_REGION.hygraph.com/v2/YOUR_PROJECT_ID/master`)

### Step 2: Create Permanent Auth Tokens

#### Read-Only Token (HYGRAPH_TOKEN)
1. Click **Create Token**
2. Name: `Read Only Token`
3. Under **Default Permissions**:
   - ✅ Check **Read** for all models
   - ❌ Uncheck **Create**, **Update**, **Delete**, **Publish**, **Unpublish**
4. Click **Create & Configure Permissions**
5. Copy the token and save it as `HYGRAPH_TOKEN` in your `.env` file

#### Mutation Token (HYGRAPH_MUTATION_TOKEN)
1. Click **Create Token**
2. Name: `Mutation Token`
3. Under **Default Permissions**:
   - ✅ Check **Read**, **Create**, **Update**, **Delete**
   - ✅ Check **Publish** and **Unpublish**
4. Or configure per-model permissions:
   - For `Bookmark`, `BookmarkGroup`, `Tag`, `EspressoNote`: Full access
5. Click **Create & Configure Permissions**
6. Copy the token and save it as `HYGRAPH_MUTATION_TOKEN` in your `.env` file

---

## Environment Variables

Create a `.env` file in the root of your project:

```bash
# Hygraph CMS
HYGRAPH_ENDPOINT=https://YOUR_REGION.hygraph.com/v2/YOUR_PROJECT_ID/master
HYGRAPH_TOKEN=your_read_only_token_here
HYGRAPH_MUTATION_TOKEN=your_mutation_token_here

# Mistral AI for Tidal playlist suggestions
MISTRAL_API_KEY=your_mistral_api_key_here
```

---

## Testing Your Setup

### Test Read Access

1. Go to **Content** in Hygraph
2. Create a test bookmark manually
3. Make sure to **Publish** it
4. Run your app: `pnpm dev`
5. Visit the bookmarks page to see if it loads

### Test Mutation Access

1. Try creating a new bookmark or espresso note from your app
2. Check if it appears in Hygraph's **Content** section
3. Verify it's published automatically

---

## Content Stage Setup (Optional)

By default, Hygraph uses content stages for workflow management.

### Option 1: Use Authentication (Recommended)
- Keep content in `DRAFT` until published
- Use your tokens for all access

### Option 2: Enable Public API
1. Go to **Settings** → **API Access**
2. Under **Public Content API**
3. Enable access to `PUBLISHED` stage
4. Your read-only queries will work without a token

---

## Troubleshooting

### "No content returned"
- ✅ Make sure you've **published** your content in Hygraph
- ✅ Check that your token has the correct permissions
- ✅ Verify the API endpoint URL is correct

### "Unauthorized" errors
- ✅ Ensure your tokens are correctly set in `.env`
- ✅ Check token permissions in Hygraph settings
- ✅ Make sure you're using the mutation token for writes

### "Field not found" errors
- ✅ Verify API IDs match exactly (case-sensitive)
- ✅ Check that all fields exist in your Hygraph model
- ✅ Ensure field types match your queries

---

## Additional Resources

- [Hygraph Documentation](https://hygraph.com/docs)
- [GraphQL API Reference](https://hygraph.com/docs/api-reference/basics/queries)
- [Content Modeling Best Practices](https://hygraph.com/docs/guides/content-modeling)
