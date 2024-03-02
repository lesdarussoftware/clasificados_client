import { Dialog } from "./Dialog";

export function AddOrEditAd({
    action,
    formData,
    handleChange,
    handleClose,
    handleSubmit,
    errors,
    disabled,
    categories,
    provinces,
    cities,
    isPrivate = false
}) {

    const width = isPrivate ? '25%' : '33%'

    return (
        <Dialog type="new-edit" top={50} left={110} width="80%">
            <h3>{action === 'NEW' ? 'Nuevo aviso' : `Editar el aviso #${formData.id}`}</h3>
            <form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width }}>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" id="content" value={formData.content} onChange={handleChange} rows={16} ></textarea>
                            {errors.content?.type === 'maxLength' && <small>* El contenido es demasiado largo.</small>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width }}>
                        <div className="form-group">
                            <label htmlFor="province">Provincia</label>
                            <select name="province" id="province" onChange={handleChange} value={formData.province}>
                                <option value="">Seleccione</option>
                                {provinces.map(p => (
                                    <option key={p.id} value={p.nombre}>{p.nombre}</option>
                                ))}
                            </select>
                            {errors.province?.type === 'required' && <small>* La provincia es requerida.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Loc. / Mun.</label>
                            <select name="city" id="city" onChange={handleChange} value={formData.city} disabled={formData.province.length === 0}>
                                <option value="">Seleccione</option>
                                {cities.map(c => (
                                    <option key={c.id} value={c.nombre}>{c.nombre}</option>
                                ))}
                            </select>
                            {errors.city?.type === 'required' && <small>* La localidad es requerida.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
                            {errors.address?.type === 'maxLength' && <small>* La dirección es demasiado larga.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} />
                            {errors.phone?.type === 'maxLength' && <small>* El teléfono es demasiado largo.</small>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width }}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                            {errors.email?.type === 'maxLength' && <small>* El email es demasiado largo.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link (ej: red social)</label>
                            <input type="text" name="link" id="link" value={formData.link} onChange={handleChange} />
                            {errors.link?.type === 'maxLength' && <small>* El link es demasiado largo.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category_id">Categoría</label>
                            <select name="category_id" id="category_id" onChange={handleChange} value={formData.category_id}>
                                <option value="">Seleccione</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id?.type === 'required' && <small>* La categoría es requerida.</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duración (días)</label>
                            <input type="number" min={1} max={7} step={1} name="duration" id="duration" value={formData.duration} onChange={handleChange} />
                        </div>
                    </div>
                    {isPrivate &&
                        <div style={{ display: 'flex', flexDirection: 'column', width }}>
                            <>
                                <div className="form-group">
                                    <label htmlFor="file">Archivo</label>
                                    <input type="file" name="file" id="file" value={formData.file} onChange={handleChange} />
                                    {errors.file?.type === 'maxLength' && <small>* El nombre del archivo es demasiado largo.</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="is_visible">Visible</label>
                                    <input type="checkbox" name="is_visible" id="is_visible"
                                        checked={formData.is_visible}
                                        onChange={(e) => handleChange({ target: { name: 'is_visible', value: e.target.checked } })}
                                    />
                                </div>
                            </>
                        </div>
                    }
                </div>
                <div className="form-footer ff-ads">
                    <button type="button" className="cancel-button" onClick={() => handleClose('new-edit')}>
                        Cancelar
                    </button>
                    <button type="submit" onClick={handleSubmit} disabled={disabled}>
                        Guardar
                    </button>
                </div>
            </form>
        </Dialog>
    )
}