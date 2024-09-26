/**
 * Just to preface this, yes I am borrowing code from DJS's main library as they don't have this in their Util or Core packages.
 * idk if this is even ok to do, if it's not and you're one of the maintainers of DJS, feel free to (civilly & calmly) let me know!
 * I would never have worked out how to do this without issues by myself :sweat_smile:
 * 
 * Borrowed from https://github.com/discordjs/discord.js/blob/main/packages/discord.js/src/util/DataResolver.js
 */

import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import { fetch } from 'undici';


/**
 * Data that can be resolved to give a Buffer. This can be:
 * * A Buffer
 * * The path to a local file
 * * A URL <warn>When provided a URL, this app will fetch the URL internally in order to create a Buffer.
 * This can pose a security risk when the URL has not been sanitized</warn>
 * @typedef {string|Buffer} BufferResolvable
 */

/**
 * @external Stream
 * @see {@link https://nodejs.org/api/stream.html}
 */

/**
 * @typedef {Object} ResolvedFile
 * @property {Buffer} data Buffer containing the file data
 * @property {string} [contentType] Content-Type of the file
 */

/**
 * Resolves a BufferResolvable to a Buffer
 * @param {BufferResolvable|Stream} resource The buffer or stream resolvable to resolve
 * @returns {Promise<ResolvedFile>}
 */
async function resolveFile(resource) {
    if (Buffer.isBuffer(resource)) return { data: resource };

    if (typeof resource[Symbol.asyncIterator] === 'function') {
        const buffers = [];
        for await (const data of resource) buffers.push(Buffer.from(data));
        return { data: Buffer.concat(buffers) };
    }
    
    if (typeof resource === 'string') {
        if (/^https?:\/\//.test(resource)) {
          const res = await fetch(resource);
          return { data: Buffer.from(await res.arrayBuffer()), contentType: res.headers.get('content-type') };
        }
    
        const file = path.resolve(resource);
    
        const stats = await fs.stat(file);
        if (!stats.isFile()) throw new Error(`File could not be found: ${file}`);
        return { data: await fs.readFile(file) };
    }

    throw new Error('The resource must be a string, Buffer or a valid file stream.')
}


/**
 * Data that resolves to give a Base64 string, typically for image uploading. This can be:
 * * A Buffer
 * * A base64 string
 * @typedef {Buffer|string} Base64Resolvable
 */

/**
 * Resolves a Base64Resolvable to a Base 64 image.
 * @param {Base64Resolvable} data The base 64 resolvable you want to resolve
 * @returns {?string}
 */
function resolveBase64(data) {
    if (Buffer.isBuffer(data)) return `data:image/jpg;base64,${data.toString('base64')}`;
    return data;
}


/**
 * Resolves a Base64Resolvable, a string, or a BufferResolvable to a Base 64 image.
 * @param {BufferResolvable|Base64Resolvable} image The image to be resolved
 * @returns {Promise<?string>}
 */
export async function resolveImage(image) {
    if (!image) return null;
    if (typeof image === 'string' && image.startsWith('data:')) {
      return image;
    }
    const file = await resolveFile(image);
    return resolveBase64(file.data);
}
